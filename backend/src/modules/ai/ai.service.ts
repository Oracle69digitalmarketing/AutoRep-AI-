import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CrmService } from '../crm/crm.service';
import { CreateReportDto } from '../../common/dto/create-report.dto';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import {
  SageMakerRuntimeClient,
  InvokeEndpointCommand,
} from '@aws-sdk/client-sagemaker-runtime';
import * as dotenv from 'dotenv';
import { redis } from '../../infra/redis.client';
import { DynamodbService } from '../../infra/dynamodb.service';
import { randomUUID } from 'crypto';

dotenv.config();

@Injectable()
export class AiService {
  private bedrockClient: BedrockRuntimeClient;
  private sageMakerClient: SageMakerRuntimeClient;
  private bedrockModelId = process.env.AWS_BEDROCK_MODEL || 'anthropic.claude-v2';
  private sageMakerEndpoint = process.env.SAGEMAKER_ENDPOINT || '';

  constructor(
    private readonly dynamodbService: DynamodbService,
    @Inject(forwardRef(() => CrmService))
    private readonly crmService: CrmService,
  ) {
    this.bedrockClient = new BedrockRuntimeClient({
      region: process.env.AWS_REGION,
    });
    this.sageMakerClient = new SageMakerRuntimeClient({
      region: process.env.AWS_REGION,
    });
  }

  public async getAiResponse(leadId: string, message: string): Promise<string> {
    const lead = await this.crmService.getLead(leadId);
    const prompt = this.createPromptForRoleDetection(message, lead);
    const modelResponse = await this.invokeAiModel(prompt);
    const { role, language, response } = this.parseRoleDetectionResponse(modelResponse);

    // Update lead with new persona info, only if it has changed
    if (role !== lead?.role || language !== lead?.language) {
      console.log(`Updating persona for lead ${leadId}: role=${role}, language=${language}`);
      await this.crmService.updateLead(leadId, {
        role,
        language,
        lastContact: new Date().toISOString(),
      });
    }

    return response;
  }

  private createPromptForRoleDetection(message: string, lead: any): string {
    const personaContext = lead ? `
      Current user context:
      - Role: ${lead.role || 'unknown'}
      - Language: ${lead.language || 'unknown'}
      - Previous messages: (not implemented yet)
    ` : '';

    return `
      Analyze the following message to determine the user's role (e.g., "real estate agent", "insurance client", "potential lead") and primary language (e.g., "English", "Pidgin", "Yoruba").
      ${personaContext}

      Message: "${message}"

      Based on your analysis, provide a response in the following JSON format. If the role or language is already known from the context, use that information to create a more relevant response.
      {
        "role": "detected_role",
        "language": "detected_language",
        "response": "A helpful, context-aware response to the user's message in their detected language."
      }
    `;
  }

  private parseRoleDetectionResponse(modelResponse: string): { role: string; language: string; response: string } {
    try {
      const parsed = JSON.parse(modelResponse);
      return {
        role: parsed.role || 'unknown',
        language: parsed.language || 'unknown',
        response: parsed.response || "I'm sorry, I couldn't process your request. Please try again.",
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      // If parsing fails, return a generic response
      return {
        role: 'unknown',
        language: 'unknown',
        response: modelResponse, // return the raw response if it's not valid JSON
      };
    }
  }

  private async invokeAiModel(prompt: string): Promise<string> {
    const cacheKey = `ai:prompt:${Buffer.from(prompt).toString('base64').slice(0, 120)}`;
    const cached = await redis.get(cacheKey);
    if (cached) return cached;

    try {
      const command = new InvokeModelCommand({
        modelId: this.bedrockModelId,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
          max_tokens_to_sample: 500, // Increased token limit for JSON response
        }),
      });
      const response = await this.bedrockClient.send(command);
      const jsonString = new TextDecoder().decode(response.body);
      const modelRes = JSON.parse(jsonString);
      const text = modelRes.completion;
      await redis.set(cacheKey, text, 'EX', 60 * 60);
      return text;
    } catch (error) {
      console.error('Bedrock invocation error, falling back to SageMaker...', error);
      return this.getSageMakerResponse(prompt);
    }
  }

  private async getSageMakerResponse(prompt: string): Promise<string> {
    if (!this.sageMakerEndpoint) {
      throw new Error('SageMaker endpoint is not configured');
    }
    try {
      const command = new InvokeEndpointCommand({
        EndpointName: this.sageMakerEndpoint,
        ContentType: 'application/json',
        Body: JSON.stringify({ inputs: prompt }),
      });
      const response = await this.sageMakerClient.send(command);
      const jsonString = new TextDecoder().decode(response.Body);
      const modelRes = JSON.parse(jsonString);
      return modelRes[0].generated_text;
    } catch (error) {
      console.error('SageMaker invocation error', error);
      throw error;
    }
  }

  async generateReport(dto: CreateReportDto) {
    const prompt = `You are an expert sales coach for field agents. Create a concise title and 5 bullet next steps from this input:\n\n${dto.content}`;
    const aiResult = await this.getAiResponse(prompt);

    const report = {
      id: { S: randomUUID() },
      title: { S: dto.title },
      input: { S: dto.content },
      aiSummary: { S: aiResult },
      createdAt: { S: new Date().toISOString() },
    };

    await this.dynamodbService.putItem(report);

    return {
      id: report.id.S,
      title: report.title.S,
      aiSummary: report.aiSummary.S,
      createdAt: report.createdAt.S,
    };
  }
}
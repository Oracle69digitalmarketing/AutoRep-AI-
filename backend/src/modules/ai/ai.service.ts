import { Injectable } from '@nestjs/common';
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

  constructor(private readonly dynamodbService: DynamodbService) {
    this.bedrockClient = new BedrockRuntimeClient({
      region: process.env.AWS_REGION,
    });
    this.sageMakerClient = new SageMakerRuntimeClient({
      region: process.env.AWS_REGION,
    });
  }

  private async getAiResponse(prompt: string): Promise<string> {
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
          max_tokens_to_sample: 300,
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
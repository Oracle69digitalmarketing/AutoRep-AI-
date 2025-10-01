import { Injectable } from '@nestjs/common';
import { CreateReportDto } from '../../common/dto/create-report.dto';
import { PredictionServiceClient, Id } from '@google-cloud/aiplatform';
import * as dotenv from 'dotenv';
import { Report } from '../../entities/report.entity';
import { AppDataSource } from '../../../ormconfig';
import { redis } from '../../infra/redis.client';
dotenv.config();

@Injectable()
export class ReportsService {
  private client: any;
  private projectId = process.env.GOOGLE_PROJECT_ID;
  private location = process.env.GOOGLE_LOCATION || 'us-central1';
  private modelId = process.env.GOOGLE_MODEL_ID || '';
  private endpointId = process.env.GOOGLE_ENDPOINT_ID || '';
  private embeddingModel = process.env.GOOGLE_EMBEDDING_MODEL || '';
  private reportRepo = AppDataSource.getRepository(Report);
  private temp = Number(process.env.VERTEX_TEMPERATURE || 0.2);
  private maxTokens = Number(process.env.VERTEX_MAX_OUTPUT_TOKENS || 512);

  constructor() {
    this.client = new PredictionServiceClient();
  }

  private getResourcePath() {
    if (this.endpointId) {
      return `projects/${this.projectId}/locations/${this.location}/endpoints/${this.endpointId}`;
    }
    return `projects/${this.projectId}/locations/${this.location}/models/${this.modelId}`;
  }

  async callVertexAI(prompt: string) {
    const cacheKey = `vertex:prompt:${Buffer.from(prompt).toString('base64').slice(0,120)}`;
    const cached = await redis.get(cacheKey);
    if (cached) return cached;

    const endpoint = this.getResourcePath();
    const instances = [{ content: prompt }];
    const request: any = {
      endpoint,
      instances,
      parameters: {
        temperature: this.temp,
        maxOutputTokens: this.maxTokens
      }
    };
    const [response] = await this.client.predict(request);
    const preds = response.predictions || [];
    const first = preds[0] || {};
    const text = first.content || first.generatedText || first.text || (typeof first === 'string' ? first : JSON.stringify(first));
    await redis.set(cacheKey, text, 'EX', 60 * 60);
    return text;
  }

  async embedText(text: string) {
    if (!this.embeddingModel) return null;
    // use predict endpoint for embeddings (Vertex behaviour varies by model)
    const endpoint = `projects/${this.projectId}/locations/${this.location}/models/${this.embeddingModel}`;
    const instances = [{ content: text }];
    const request: any = { endpoint, instances };
    const [response] = await this.client.predict(request);
    const preds = response.predictions || [];
    const first = preds[0] || {};
    // many embedding responses have 'embedding' or 'values'
    return first.embedding || first.values || first;
  }

  async generateReport(dto: CreateReportDto) {
    const prompt = `You are an expert sales coach for field agents. Create a concise title and 5 bullet next steps from this input:\n\n${dto.content}`;
    const aiResult = await this.callVertexAI(prompt);

    const report = new Report();
    report.title = dto.title;
    report.input = dto.content;
    report.aiSummary = aiResult;
    await this.reportRepo.save(report);
    return {
      id: report.id,
      title: report.title,
      aiSummary: report.aiSummary,
      createdAt: report.createdAt
    };
  }
}

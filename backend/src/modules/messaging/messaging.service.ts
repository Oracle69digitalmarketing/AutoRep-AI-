import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AppDataSource } from '../../../ormconfig';
import { Lead } from '../../entities/lead.entity';
import { ReportsService } from '../reports/reports.service';
import { redis } from '../../infra/redis.client';
import { initPinecone, getIndex } from '../../infra/pinecone.client';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MessagingService {
  private leadRepo = AppDataSource.getRepository(Lead);
  constructor(
    @Inject(forwardRef(() => ReportsService)) private readonly reportsService: ReportsService
  ) {}

  async handleIncomingMessage({ from, to, text, raw }) {
    const phone = String(from || 'unknown');
    let lead = await this.leadRepo.findOneBy({ phone });
    if (!lead) {
      lead = new Lead();
      lead.name = phone;
      lead.phone = phone;
      lead.channel = 'whatsapp';
    }
    lead.rawText = text;
    await this.leadRepo.save(lead);

    const score = await this.scoreLead(text);
    lead.score = score;
    await this.leadRepo.save(lead);

    if (score >= 0.7) {
      const dto = { title: `Lead ${lead.phone}`, content: text };
      await this.reportsService.generateReport(dto);
    }

    await redis.set(`lead:last:${phone}`, text, 'EX', 60 * 60 * 24);
    return true;
  }

  async scoreLead(text: string): Promise<number> {
    const fastHeuristic = /budget|urgent|now|ready|today|interested|buy|loan|finance/i.test(text) ? 0.6 : 0.2;
    try {
      const pine = await initPinecone();
      if (!pine) return fastHeuristic;
      const indexName = process.env.PINECONE_INDEX_NAME || 'autorep-leads';
      const index = getIndex(indexName);
      // Use ReportsService embedding if available
      const emb = await this.reportsService.embedText(text).catch(()=>null);
      if (!emb) return fastHeuristic;
      const vector = Array.isArray(emb) ? emb : Object.values(emb).slice(0,1536).map(Number);
      const queryRequest = {
        topK: 3,
        includeValues: false,
        includeMetadata: true,
        vector
      };
      const response = await index.query({ queryRequest });
      const matches = response.matches || [];
      const matchScore = matches.length ? Math.max(...matches.map(m => m.score || 0)) : 0;
      const final = Math.min(1, fastHeuristic + matchScore);
      return final;
    } catch (err) {
      return fastHeuristic;
    }
  }
}

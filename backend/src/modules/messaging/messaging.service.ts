import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { SqsService } from '../../infra/sqs.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MessagingService {
  constructor(
    @Inject(forwardRef(() => AiService)) private readonly aiService: AiService,
    private readonly sqsService: SqsService
  ) {}

  async handleIncomingMessage(payload: any) {
    // Basic handler for Pinpoint webhook
    // Logic is to queue the message for offline processing
    const { originationNumber, messageBody } = payload;

    console.log(`Queueing message from ${originationNumber}: ${messageBody}`);
    await this.sqsService.sendMessage(payload);

    return { status: 'queued' };
  }
}
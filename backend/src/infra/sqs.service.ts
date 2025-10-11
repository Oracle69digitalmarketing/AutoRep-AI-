import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SqsService {
  private client: SQSClient;
  private queueUrl = process.env.SQS_QUEUE_URL;

  constructor() {
    this.client = new SQSClient({ region: process.env.AWS_REGION });
  }

  async sendMessage(messageBody: any) {
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(messageBody),
    });
    return this.client.send(command);
  }
}
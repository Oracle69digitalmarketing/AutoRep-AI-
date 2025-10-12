import { Injectable } from '@nestjs/common';
import { SQSClient, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { AiService } from '../ai/ai.service';
import { MessagingService } from '../messaging/messaging.service';
import { SQSRecord } from 'aws-lambda';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SqsConsumerService {
  private readonly sqsClient: SQSClient;
  private readonly queueUrl = process.env.SQS_QUEUE_URL;

  constructor(
    private readonly aiService: AiService,
    private readonly messagingService: MessagingService,
  ) {
    this.sqsClient = new SQSClient({ region: process.env.AWS_REGION });
  }

  async processMessages(messages: SQSRecord[]) {
    for (const message of messages) {
      try {
        await this.processMessage(message);
        await this.deleteMessage(message.receiptHandle);
      } catch (error) {
        console.error('Error processing SQS message:', error);
        // Decide on error handling: continue, or throw to retry batch
      }
    }
  }

  private async processMessage(message: SQSRecord) {
    const payload = JSON.parse(message.body);
    const { originationNumber, messageBody } = payload;

    console.log(`Processing message from ${originationNumber}: ${messageBody}`);

    const aiResponse = await this.aiService.getAiResponse(originationNumber, messageBody);
    await this.messagingService.sendMessage(originationNumber, aiResponse);

    console.log(`Sent AI response to ${originationNumber}`);
  }

  private async deleteMessage(receiptHandle: string) {
    const deleteMessageCommand = new DeleteMessageCommand({
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    });
    await this.sqsClient.send(deleteMessageCommand);
  }
}
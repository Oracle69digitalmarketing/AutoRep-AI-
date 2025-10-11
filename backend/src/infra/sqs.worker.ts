import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { AiService } from '../modules/ai/ai.service';
import { ChatGateway } from '../modules/messaging/chat.gateway';
import * as dotenv from 'dotenv';

dotenv.config();

const queueUrl = process.env.SQS_QUEUE_URL;
const sqsClient = new SQSClient({ region: process.env.AWS_REGION });

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aiService = app.get(AiService);
  const chatGateway = app.get(ChatGateway);

  console.log('SQS worker started, polling...');
  while (true) {
    try {
      const receiveCommand = new ReceiveMessageCommand({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 20,
      });
      const { Messages } = await sqsClient.send(receiveCommand);

      if (Messages && Messages.length > 0) {
        const message = Messages[0];
        const payload = JSON.parse(message.Body);
        console.log('Processing message:', payload);

        const { originationNumber, messageBody } = payload;
        const dto = { title: `Lead ${originationNumber}`, content: messageBody };
        const aiResponse = await aiService.generateReport(dto);

        chatGateway.server.emit('receiveMessage', {
          sender: 'ai',
          text: aiResponse.aiSummary,
          leadId: originationNumber,
        });

        const deleteCommand = new DeleteMessageCommand({
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle,
        });
        await sqsClient.send(deleteCommand);
      }
    } catch (error) {
      console.error('SQS worker error:', error);
      // Avoid fast spinning on error
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

bootstrap().catch(console.error);
import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { SqsConsumerService } from './modules/tasks/sqs-consumer.service';
import { INestApplicationContext } from '@nestjs/common';
import { SQSEvent, SQSHandler } from 'aws-lambda';

let app: INestApplicationContext;

async function bootstrap(): Promise<INestApplicationContext> {
  if (!app) {
    app = await NestFactory.createApplicationContext(WorkerModule);
  }
  return app;
}

export const handler: SQSHandler = async (event: SQSEvent) => {
  const appContext = await bootstrap();
  const sqsConsumerService = appContext.get(SqsConsumerService);
  await sqsConsumerService.processMessages(event.Records);
};
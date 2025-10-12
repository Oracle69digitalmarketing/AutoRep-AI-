import { Module } from '@nestjs/common';
import { SqsConsumerService } from './sqs-consumer.service';
import { AiModule } from '../ai/ai.module';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [AiModule, MessagingModule],
  providers: [SqsConsumerService],
  exports: [SqsConsumerService],
})
export class TasksModule {}
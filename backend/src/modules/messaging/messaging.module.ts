import { Module, forwardRef } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service';
import { AiModule } from '../ai/ai.module';
import { SqsModule } from '../../infra/sqs.module';

@Module({
  imports: [forwardRef(() => AiModule), SqsModule],
  controllers: [MessagingController],
  providers: [MessagingService],
  exports: [MessagingService]
})
export class MessagingModule {}

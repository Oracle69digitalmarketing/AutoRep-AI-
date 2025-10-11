import { Module, forwardRef } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service';
import { ChatGateway } from './chat.gateway';
import { AiModule } from '../ai/ai.module';
import { SqsModule } from '../../infra/sqs.module';
import { CrmModule } from '../crm/crm.module';

@Module({
  imports: [forwardRef(() => AiModule), SqsModule, CrmModule],
  controllers: [MessagingController],
  providers: [MessagingService, ChatGateway],
  exports: [MessagingService, ChatGateway],
})
export class MessagingModule {}

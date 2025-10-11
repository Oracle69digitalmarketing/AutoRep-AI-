import { Module, forwardRef } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { MessagingModule } from '../messaging/messaging.module';
import { DynamodbModule } from '../../infra/dynamodb.module';

@Module({
  imports: [forwardRef(() => MessagingModule), DynamodbModule],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService]
})
export class AiModule {}

import { Module } from '@nestjs/common';
import { AiModule } from './modules/ai/ai.module';
import { MessagingModule } from './modules/messaging/messaging.module';

@Module({
  imports: [AiModule, MessagingModule],
})
export class AppModule {}

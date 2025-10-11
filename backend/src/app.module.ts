import { Module } from '@nestjs/common';
import { AiModule } from './modules/ai/ai.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { FunnelsModule } from './modules/funnels/funnels.module';
import { CrmModule } from './modules/crm/crm.module';

@Module({
  imports: [AiModule, MessagingModule, FunnelsModule, CrmModule],
})
export class AppModule {}

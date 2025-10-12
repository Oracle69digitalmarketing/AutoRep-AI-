import { Module } from '@nestjs/common';
import { CrmModule } from './modules/crm/crm.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AiModule } from './modules/ai/ai.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [
    CrmModule,
    TasksModule,
    AiModule,
    MessagingModule,
    InfraModule,
  ],
})
export class WorkerModule {}
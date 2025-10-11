import { Module, forwardRef } from '@nestjs/common';
import { FunnelsController } from './funnels.controller';
import { FunnelsService } from './funnels.service';
import { FunnelExecutionService } from './funnel-execution.service';
import { S3Module } from '../../infra/s3.module';
import { MessagingModule } from '../messaging/messaging.module';
import { CrmModule } from '../crm/crm.module';

@Module({
  imports: [S3Module, forwardRef(() => MessagingModule), CrmModule],
  controllers: [FunnelsController],
  providers: [FunnelsService, FunnelExecutionService],
  exports: [FunnelExecutionService],
})
export class FunnelsModule {}
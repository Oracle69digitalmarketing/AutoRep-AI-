import { Module, forwardRef } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [forwardRef(() => ReportsModule)],
  controllers: [MessagingController],
  providers: [MessagingService],
  exports: [MessagingService]
})
export class MessagingModule {}

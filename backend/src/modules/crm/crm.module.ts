import { Module, forwardRef } from '@nestjs/common';
import { CrmController } from './crm.controller';
import { CrmService } from './crm.service';
import { DynamodbModule } from '../../infra/dynamodb.module';
import { FunnelsModule } from '../funnels/funnels.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DynamodbModule, forwardRef(() => FunnelsModule), AuthModule],
  controllers: [CrmController],
  providers: [CrmService],
  exports: [CrmService],
})
export class CrmModule {}
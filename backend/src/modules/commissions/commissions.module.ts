import { Module } from '@nestjs/common';
import { CommissionsController } from './commissions.controller';
import { CommissionsService } from './commissions.service';
import { DynamodbModule } from '../../infra/dynamodb.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DynamodbModule, AuthModule],
  controllers: [CommissionsController],
  providers: [CommissionsService],
})
export class CommissionsModule {}
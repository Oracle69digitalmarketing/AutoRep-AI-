import { Module } from '@nestjs/common';
import { FunnelsController } from './funnels.controller';
import { FunnelsService } from './funnels.service';
import { S3Module } from '../../infra/s3.module';

@Module({
  imports: [S3Module],
  controllers: [FunnelsController],
  providers: [FunnelsService],
})
export class FunnelsModule {}
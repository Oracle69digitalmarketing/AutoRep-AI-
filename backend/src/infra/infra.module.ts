import { Module } from '@nestjs/common';
import { DynamodbService } from './dynamodb.service';
import { S3Service } from './s3.service';
import { SqsService } from './sqs.service';

@Module({
  providers: [DynamodbService, S3Service, SqsService],
  exports: [DynamodbService, S3Service, SqsService],
})
export class InfraModule {}
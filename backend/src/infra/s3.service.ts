import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class S3Service {
  private client: S3Client;
  private bucketName = process.env.S3_BUCKET_NAME;

  constructor() {
    this.client = new S3Client({ region: process.env.AWS_REGION });
  }

  async putObject(key: string, body: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
    });
    return this.client.send(command);
  }
}
import { Injectable } from '@nestjs/common';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DynamodbService {
  private client: DynamoDBClient;
  private tableName = process.env.DYNAMODB_TABLE;

  constructor() {
    this.client = new DynamoDBClient({ region: process.env.AWS_REGION });
  }

  async putItem(item: any) {
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: item,
    });
    return this.client.send(command);
  }
}
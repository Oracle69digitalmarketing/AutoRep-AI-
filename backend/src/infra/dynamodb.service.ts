import { Injectable } from '@nestjs/common';
import { DynamoDBClient, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand, QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DynamodbService {
  private client: DynamoDBClient;
  public tableName = process.env.DYNAMODB_TABLE;

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

  async getItem(key: any) {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: key,
    });
    return this.client.send(command);
  }

  async updateItem(key: any, updateExpression: string, expressionAttributeValues: any) {
    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });
    return this.client.send(command);
  }

  async deleteItem(key: any) {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: key,
    });
    return this.client.send(command);
  }

  async query(keyConditionExpression: string, expressionAttributeValues: any) {
    const command = new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    });
    return this.client.send(command);
  }

  async scan(scanParams: any) {
    const command = new ScanCommand(scanParams);
    return this.client.send(command);
  }

  mapFromDynamoDB(item: any) {
    if (!item) return null;
    const data: { [key: string]: any } = {};
    for (const key in item) {
      if (item[key].S) {
        data[key] = item[key].S;
      } else if (item[key].N) {
        data[key] = Number(item[key].N);
      } else if (item[key].BOOL) {
        data[key] = item[key].BOOL;
      } else if (item[key].L) {
        data[key] = item[key].L.map((i: any) => this.mapFromDynamoDB(i));
      } else if (item[key].M) {
        data[key] = this.mapFromDynamoDB(item[key].M);
      }
    }
    return data;
  }
}
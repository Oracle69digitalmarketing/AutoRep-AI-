import { Injectable } from '@nestjs/common';
import { DynamodbService } from '../../infra/dynamodb.service';
import { randomUUID } from 'crypto';

@Injectable()
export class CommissionsService {
  private readonly commissionRate = 0.1; // 10%

  constructor(private readonly dynamodbService: DynamodbService) {}

  async recordSale(agentId: string, amount: number) {
    const commissionId = randomUUID();
    const commissionAmount = amount * this.commissionRate;
    const item = {
      PK: { S: `AGENT#${agentId}` },
      SK: { S: `COMMISSION#${commissionId}` },
      amount: { N: amount.toString() },
      commissionAmount: { N: commissionAmount.toString() },
      createdAt: { S: new Date().toISOString() },
    };
    await this.dynamodbService.putItem(item);
    return this.mapFromDynamoDB(item);
  }

  async getCommissionsForAgent(agentId: string) {
    const keyConditionExpression = 'PK = :pk and begins_with(SK, :sk)';
    const expressionAttributeValues = {
      ':pk': { S: `AGENT#${agentId}` },
      ':sk': { S: 'COMMISSION#' },
    };
    const { Items } = await this.dynamodbService.query(keyConditionExpression, expressionAttributeValues);
    return Items.map(this.mapFromDynamoDB);
  }

  private mapFromDynamoDB(item: any) {
    if (!item) return null;
    const data = {};
    for (const key in item) {
      if (item[key].S) {
        data[key] = item[key].S;
      } else if (item[key].N) {
        data[key] = Number(item[key].N);
      }
    }
    return data;
  }
}
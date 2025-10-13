import { Injectable } from '@nestjs/common';
import { DynamodbService } from '../../infra/dynamodb.service';

@Injectable()
export class AdminService {
  constructor(private readonly dynamodbService: DynamodbService) {}

  async getLeadsSummary() {
    // This implementation scans the entire table for leads, which can be inefficient.
    // For production use, a secondary index on a "type" attribute would be more performant.
    const scanParams = {
      TableName: this.dynamodbService.tableName,
      FilterExpression: "begins_with(PK, :pk)",
      ExpressionAttributeValues: {
        ":pk": { S: "LEAD#" },
      },
    };
    const { Items, Count } = await this.dynamodbService.scan(scanParams);
    const leads = Items ? Items.map((item) => this.dynamodbService.mapFromDynamoDB(item)) : [];
    
    // This is not a real "top leads" implementation, as it's not sorting by score.
    // A secondary index on the score would be needed for that.
    const topLeads = leads.slice(0, 10);

    return { totalLeads: Count || 0, topLeads: topLeads };
  }
}

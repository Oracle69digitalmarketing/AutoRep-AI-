import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { DynamodbService } from '../../infra/dynamodb.service';
import { FunnelExecutionService } from '../funnels/funnel-execution.service';
import { randomUUID } from 'crypto';

@Injectable()
export class CrmService {
  constructor(
    private readonly dynamodbService: DynamodbService,
    @Inject(forwardRef(() => FunnelExecutionService))
    private readonly funnelExecutionService: FunnelExecutionService,
  ) {}

  async createAgent(agentData: any) {
    const agentId = randomUUID();
    const item = {
      PK: { S: `AGENT#${agentId}` },
      SK: { S: `AGENT#${agentId}` },
      ...this.mapToDynamoDB(agentData),
    };
    await this.dynamodbService.putItem(item);
    return this.mapFromDynamoDB(item);
  }

  async createLead(leadData: any) {
    const leadId = randomUUID();
    const item = {
      PK: { S: `LEAD#${leadId}` },
      SK: { S: `LEAD#${leadId}` },
      ...this.mapToDynamoDB(leadData),
    };
    await this.dynamodbService.putItem(item);
    return this.mapFromDynamoDB(item);
  }

  async getLead(id: string) {
    const key = { PK: { S: `LEAD#${id}` }, SK: { S: `LEAD#${id}` } };
    const { Item } = await this.dynamodbService.getItem(key);
    return this.mapFromDynamoDB(Item);
  }

  async updateLead(id: string, leadData: any) {
    const key = { PK: { S: `LEAD#${id}` }, SK: { S: `LEAD#${id}` } };
    const { updateExpression, expressionAttributeValues } = this.buildUpdateExpressions(leadData);
    const { Attributes } = await this.dynamodbService.updateItem(key, updateExpression, expressionAttributeValues);
    return this.mapFromDynamoDB(Attributes);
  }

  async deleteLead(id: string) {
    const key = { PK: { S: `LEAD#${id}` }, SK: { S: `LEAD#${id}` } };
    await this.dynamodbService.deleteItem(key);
    return { id };
  }

  private mapToDynamoDB(data: any) {
    const item: { [key: string]: any } = {};
    for (const key in data) {
      item[key] = { S: data[key].toString() };
    }
    return item;
  }

  private mapFromDynamoDB(item: any) {
    if (!item) return null;
    const data: { [key: string]: any } = {};
    for (const key in item) {
      data[key] = item[key].S;
    }
    return data;
  }

  private buildUpdateExpressions(data: any) {
    let updateExpression = 'set';
    const expressionAttributeValues: { [key: string]: any } = {};
    for (const key in data) {
      updateExpression += ` #${key} = :${key},`;
      expressionAttributeValues[`:${key}`] = { S: data[key].toString() };
    }
    updateExpression = updateExpression.slice(0, -1); // remove last comma
    return { updateExpression, expressionAttributeValues };
  }

  async triggerFunnel(leadId: string, funnelId: string) {
    await this.funnelExecutionService.executeFunnel(funnelId, leadId);
    return { status: 'triggered' };
  }

  async assignAgentToLead(leadId: string, agentId: string) {
    const key = { PK: { S: `LEAD#${leadId}` }, SK: { S: `LEAD#${leadId}` } };
    const { updateExpression, expressionAttributeValues } = this.buildUpdateExpressions({ agentId });
    const { Attributes } = await this.dynamodbService.updateItem(key, updateExpression, expressionAttributeValues);
    return this.mapFromDynamoDB(Attributes);
  }
}
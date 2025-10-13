import { Injectable } from '@nestjs/common';
import { DynamodbService } from '../../infra/dynamodb.service';
import { CreateTaskDto } from '../../common/dto/create-task.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {
  constructor(private readonly dynamodbService: DynamodbService) {}

  async createTask(dto: CreateTaskDto) {
    const taskId = randomUUID();
    const item = {
      PK: { S: `TASK#${taskId}` },
      SK: { S: `TASK#${taskId}` },
      title: { S: dto.title },
      dueDate: { S: dto.dueDate },
      createdAt: { S: new Date().toISOString() },
    };
    await this.dynamodbService.putItem(item);
    return { id: taskId, ...dto };
  }

  async listTasks() {
    // This implementation scans the entire table for tasks, which can be inefficient.
    // For production use, a secondary index on a "type" attribute would be more performant.
    const scanParams = {
      TableName: this.dynamodbService.tableName,
      FilterExpression: "begins_with(PK, :pk)",
      ExpressionAttributeValues: {
        ":pk": { S: "TASK#" },
      },
    };
    const { Items } = await this.dynamodbService.scan(scanParams);
    return Items ? Items.map((item) => this.dynamodbService.mapFromDynamoDB(item)) : [];
  }
}

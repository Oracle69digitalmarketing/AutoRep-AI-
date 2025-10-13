"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const dynamodb_service_1 = require("../../infra/dynamodb.service");
const crypto_1 = require("crypto");
let TasksService = class TasksService {
    constructor(dynamodbService) {
        this.dynamodbService = dynamodbService;
    }
    async createTask(dto) {
        const taskId = (0, crypto_1.randomUUID)();
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
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dynamodb_service_1.DynamodbService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map
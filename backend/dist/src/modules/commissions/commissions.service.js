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
exports.CommissionsService = void 0;
const common_1 = require("@nestjs/common");
const dynamodb_service_1 = require("../../infra/dynamodb.service");
const crypto_1 = require("crypto");
let CommissionsService = class CommissionsService {
    constructor(dynamodbService) {
        this.dynamodbService = dynamodbService;
        this.commissionRate = 0.1;
    }
    async recordSale(agentId, amount) {
        const commissionId = (0, crypto_1.randomUUID)();
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
    async getCommissionsForAgent(agentId) {
        const keyConditionExpression = 'PK = :pk and begins_with(SK, :sk)';
        const expressionAttributeValues = {
            ':pk': { S: `AGENT#${agentId}` },
            ':sk': { S: 'COMMISSION#' },
        };
        const { Items } = await this.dynamodbService.query(keyConditionExpression, expressionAttributeValues);
        if (!Items) {
            return [];
        }
        return Items.map(this.mapFromDynamoDB);
    }
    mapFromDynamoDB(item) {
        if (!item)
            return null;
        const data = {};
        for (const key in item) {
            if (item[key].S) {
                data[key] = item[key].S;
            }
            else if (item[key].N) {
                data[key] = Number(item[key].N);
            }
        }
        return data;
    }
};
exports.CommissionsService = CommissionsService;
exports.CommissionsService = CommissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dynamodb_service_1.DynamodbService])
], CommissionsService);
//# sourceMappingURL=commissions.service.js.map
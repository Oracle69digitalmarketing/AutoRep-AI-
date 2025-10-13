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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmService = void 0;
const common_1 = require("@nestjs/common");
const dynamodb_service_1 = require("../../infra/dynamodb.service");
const funnel_execution_service_1 = require("../funnels/funnel-execution.service");
const crypto_1 = require("crypto");
let CrmService = class CrmService {
    constructor(dynamodbService, funnelExecutionService) {
        this.dynamodbService = dynamodbService;
        this.funnelExecutionService = funnelExecutionService;
    }
    async createAgent(agentData) {
        const agentId = (0, crypto_1.randomUUID)();
        const item = {
            PK: { S: `AGENT#${agentId}` },
            SK: { S: `AGENT#${agentId}` },
            ...this.mapToDynamoDB(agentData),
        };
        await this.dynamodbService.putItem(item);
        return this.mapFromDynamoDB(item);
    }
    async createLead(leadData) {
        const leadId = (0, crypto_1.randomUUID)();
        const item = {
            PK: { S: `LEAD#${leadId}` },
            SK: { S: `LEAD#${leadId}` },
            ...this.mapToDynamoDB(leadData),
        };
        await this.dynamodbService.putItem(item);
        return this.mapFromDynamoDB(item);
    }
    async getLead(id) {
        const key = { PK: { S: `LEAD#${id}` }, SK: { S: `LEAD#${id}` } };
        const { Item } = await this.dynamodbService.getItem(key);
        return this.mapFromDynamoDB(Item);
    }
    async updateLead(id, leadData) {
        const key = { PK: { S: `LEAD#${id}` }, SK: { S: `LEAD#${id}` } };
        const { updateExpression, expressionAttributeValues } = this.buildUpdateExpressions(leadData);
        const { Attributes } = await this.dynamodbService.updateItem(key, updateExpression, expressionAttributeValues);
        return this.mapFromDynamoDB(Attributes);
    }
    async deleteLead(id) {
        const key = { PK: { S: `LEAD#${id}` }, SK: { S: `LEAD#${id}` } };
        await this.dynamodbService.deleteItem(key);
        return { id };
    }
    mapToDynamoDB(data) {
        const item = {};
        for (const key in data) {
            item[key] = { S: data[key].toString() };
        }
        return item;
    }
    mapFromDynamoDB(item) {
        if (!item)
            return null;
        const data = {};
        for (const key in item) {
            data[key] = item[key].S;
        }
        return data;
    }
    buildUpdateExpressions(data) {
        let updateExpression = 'set';
        const expressionAttributeValues = {};
        for (const key in data) {
            updateExpression += ` #${key} = :${key},`;
            expressionAttributeValues[`:${key}`] = { S: data[key].toString() };
        }
        updateExpression = updateExpression.slice(0, -1);
        return { updateExpression, expressionAttributeValues };
    }
    async triggerFunnel(leadId, funnelId) {
        await this.funnelExecutionService.executeFunnel(funnelId, leadId);
        return { status: 'triggered' };
    }
    async assignAgentToLead(leadId, agentId) {
        const key = { PK: { S: `LEAD#${leadId}` }, SK: { S: `LEAD#${leadId}` } };
        const { updateExpression, expressionAttributeValues } = this.buildUpdateExpressions({ agentId });
        const { Attributes } = await this.dynamodbService.updateItem(key, updateExpression, expressionAttributeValues);
        return this.mapFromDynamoDB(Attributes);
    }
};
exports.CrmService = CrmService;
exports.CrmService = CrmService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => funnel_execution_service_1.FunnelExecutionService))),
    __metadata("design:paramtypes", [dynamodb_service_1.DynamodbService,
        funnel_execution_service_1.FunnelExecutionService])
], CrmService);
//# sourceMappingURL=crm.service.js.map
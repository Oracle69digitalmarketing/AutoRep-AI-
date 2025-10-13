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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const dynamodb_service_1 = require("../../infra/dynamodb.service");
let AdminService = class AdminService {
    constructor(dynamodbService) {
        this.dynamodbService = dynamodbService;
    }
    async getLeadsSummary() {
        const scanParams = {
            TableName: this.dynamodbService.tableName,
            FilterExpression: "begins_with(PK, :pk)",
            ExpressionAttributeValues: {
                ":pk": { S: "LEAD#" },
            },
        };
        const { Items, Count } = await this.dynamodbService.scan(scanParams);
        const leads = Items ? Items.map((item) => this.dynamodbService.mapFromDynamoDB(item)) : [];
        const topLeads = leads.slice(0, 10);
        return { totalLeads: Count || 0, topLeads: topLeads };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dynamodb_service_1.DynamodbService])
], AdminService);
//# sourceMappingURL=admin.service.js.map
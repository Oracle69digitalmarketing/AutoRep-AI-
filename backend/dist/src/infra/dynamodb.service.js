"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamodbService = void 0;
const common_1 = require("@nestjs/common");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let DynamodbService = class DynamodbService {
    constructor() {
        this.tableName = process.env.DYNAMODB_TABLE;
        this.client = new client_dynamodb_1.DynamoDBClient({ region: process.env.AWS_REGION });
    }
    async putItem(item) {
        const command = new client_dynamodb_1.PutItemCommand({
            TableName: this.tableName,
            Item: item,
        });
        return this.client.send(command);
    }
    async getItem(key) {
        const command = new client_dynamodb_1.GetItemCommand({
            TableName: this.tableName,
            Key: key,
        });
        return this.client.send(command);
    }
    async updateItem(key, updateExpression, expressionAttributeValues) {
        const command = new client_dynamodb_1.UpdateItemCommand({
            TableName: this.tableName,
            Key: key,
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        });
        return this.client.send(command);
    }
    async deleteItem(key) {
        const command = new client_dynamodb_1.DeleteItemCommand({
            TableName: this.tableName,
            Key: key,
        });
        return this.client.send(command);
    }
    async query(keyConditionExpression, expressionAttributeValues) {
        const command = new client_dynamodb_1.QueryCommand({
            TableName: this.tableName,
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeValues: expressionAttributeValues,
        });
        return this.client.send(command);
    }
};
exports.DynamodbService = DynamodbService;
exports.DynamodbService = DynamodbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DynamodbService);
//# sourceMappingURL=dynamodb.service.js.map
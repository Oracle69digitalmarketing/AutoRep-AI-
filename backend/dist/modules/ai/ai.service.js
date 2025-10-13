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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const crm_service_1 = require("../crm/crm.service");
const client_bedrock_runtime_1 = require("@aws-sdk/client-bedrock-runtime");
const client_sagemaker_runtime_1 = require("@aws-sdk/client-sagemaker-runtime");
const dotenv = __importStar(require("dotenv"));
const redis_client_1 = require("../../infra/redis.client");
const dynamodb_service_1 = require("../../infra/dynamodb.service");
const crypto_1 = require("crypto");
dotenv.config();
let AiService = class AiService {
    constructor(dynamodbService, crmService) {
        this.dynamodbService = dynamodbService;
        this.crmService = crmService;
        this.bedrockModelId = process.env.AWS_BEDROCK_MODEL || 'anthropic.claude-v2';
        this.sageMakerEndpoint = process.env.SAGEMAKER_ENDPOINT || '';
        this.bedrockClient = new client_bedrock_runtime_1.BedrockRuntimeClient({
            region: process.env.AWS_REGION,
        });
        this.sageMakerClient = new client_sagemaker_runtime_1.SageMakerRuntimeClient({
            region: process.env.AWS_REGION,
        });
    }
    async getAiResponse(leadId, message) {
        const lead = await this.crmService.getLead(leadId);
        const prompt = this.createPromptForRoleDetection(message, lead);
        const modelResponse = await this.invokeAiModel(prompt);
        const { role, language, response } = this.parseRoleDetectionResponse(modelResponse);
        if (role !== lead?.role || language !== lead?.language) {
            console.log(`Updating persona for lead ${leadId}: role=${role}, language=${language}`);
            await this.crmService.updateLead(leadId, {
                role,
                language,
                lastContact: new Date().toISOString(),
            });
        }
        return response;
    }
    createPromptForRoleDetection(message, lead) {
        const personaContext = lead ? `
      Current user context:
      - Role: ${lead.role || 'unknown'}
      - Language: ${lead.language || 'unknown'}
      - Previous messages: (not implemented yet)
    ` : '';
        return `
      Analyze the following message to determine the user's role (e.g., "real estate agent", "insurance client", "potential lead") and primary language (e.g., "English", "Pidgin", "Yoruba").
      ${personaContext}

      Message: "${message}"

      Based on your analysis, provide a response in the following JSON format. If the role or language is already known from the context, use that information to create a more relevant response.
      {
        "role": "detected_role",
        "language": "detected_language",
        "response": "A helpful, context-aware response to the user's message in their detected language."
      }
    `;
    }
    parseRoleDetectionResponse(modelResponse) {
        try {
            const parsed = JSON.parse(modelResponse);
            return {
                role: parsed.role || 'unknown',
                language: parsed.language || 'unknown',
                response: parsed.response || "I'm sorry, I couldn't process your request. Please try again.",
            };
        }
        catch (error) {
            console.error('Error parsing AI response:', error);
            return {
                role: 'unknown',
                language: 'unknown',
                response: modelResponse,
            };
        }
    }
    async invokeAiModel(prompt) {
        const cacheKey = `ai:prompt:${Buffer.from(prompt).toString('base64').slice(0, 120)}`;
        const cached = await redis_client_1.redis.get(cacheKey);
        if (cached)
            return cached;
        try {
            const command = new client_bedrock_runtime_1.InvokeModelCommand({
                modelId: this.bedrockModelId,
                contentType: 'application/json',
                accept: 'application/json',
                body: JSON.stringify({
                    prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
                    max_tokens_to_sample: 500,
                }),
            });
            const response = await this.bedrockClient.send(command);
            const jsonString = new TextDecoder().decode(response.body);
            const modelRes = JSON.parse(jsonString);
            const text = modelRes.completion;
            await redis_client_1.redis.set(cacheKey, text, 'EX', 60 * 60);
            return text;
        }
        catch (error) {
            console.error('Bedrock invocation error, falling back to SageMaker...', error);
            return this.getSageMakerResponse(prompt);
        }
    }
    async getSageMakerResponse(prompt) {
        if (!this.sageMakerEndpoint) {
            throw new Error('SageMaker endpoint is not configured');
        }
        try {
            const command = new client_sagemaker_runtime_1.InvokeEndpointCommand({
                EndpointName: this.sageMakerEndpoint,
                ContentType: 'application/json',
                Body: JSON.stringify({ inputs: prompt }),
            });
            const response = await this.sageMakerClient.send(command);
            const jsonString = new TextDecoder().decode(response.Body);
            const modelRes = JSON.parse(jsonString);
            return modelRes[0].generated_text;
        }
        catch (error) {
            console.error('SageMaker invocation error', error);
            throw error;
        }
    }
    async generateReport(dto) {
        const prompt = `You are an expert sales coach for field agents. Create a concise title and 5 bullet next steps from this input:\n\n${dto.content}`;
        const aiResult = await this.invokeAiModel(prompt);
        const report = {
            id: { S: (0, crypto_1.randomUUID)() },
            title: { S: dto.title },
            input: { S: dto.content },
            aiSummary: { S: aiResult },
            createdAt: { S: new Date().toISOString() },
        };
        await this.dynamodbService.putItem(report);
        return {
            id: report.id.S,
            title: report.title.S,
            aiSummary: report.aiSummary.S,
            createdAt: report.createdAt.S,
        };
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => crm_service_1.CrmService))),
    __metadata("design:paramtypes", [dynamodb_service_1.DynamodbService,
        crm_service_1.CrmService])
], AiService);
//# sourceMappingURL=ai.service.js.map
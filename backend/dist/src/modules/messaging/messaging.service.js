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
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("../ai/ai.service");
const sqs_service_1 = require("../../infra/sqs.service");
const crm_service_1 = require("../crm/crm.service");
const client_pinpoint_1 = require("@aws-sdk/client-pinpoint");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let MessagingService = class MessagingService {
    constructor(aiService, sqsService, crmService) {
        this.aiService = aiService;
        this.sqsService = sqsService;
        this.crmService = crmService;
        this.pinpointClient = new client_pinpoint_1.PinpointClient({ region: process.env.AWS_REGION });
    }
    async handleIncomingMessage(payload) {
        const { originationNumber, messageBody } = payload;
        let lead = await this.crmService.getLead(originationNumber);
        if (!lead) {
            lead = await this.crmService.createLead({ id: originationNumber, name: originationNumber, phone: originationNumber });
        }
        if (!lead || !lead.id) {
            throw new Error('Could not create or find lead');
        }
        await this.crmService.updateLead(lead.id, { lastMessage: messageBody });
        console.log(`Queueing message from ${originationNumber}: ${messageBody}`);
        await this.sqsService.sendMessage(payload);
        return { status: 'queued' };
    }
    async sendMessage(destinationNumber, message) {
        const command = new client_pinpoint_1.SendMessagesCommand({
            ApplicationId: process.env.PINPOINT_APPLICATION_ID,
            MessageRequest: {
                Addresses: {
                    [destinationNumber]: {
                        ChannelType: 'SMS',
                    },
                },
                MessageConfiguration: {
                    SMSMessage: {
                        Body: message,
                        MessageType: 'TRANSACTIONAL',
                    },
                },
            },
        });
        return this.pinpointClient.send(command);
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => ai_service_1.AiService))),
    __metadata("design:paramtypes", [ai_service_1.AiService,
        sqs_service_1.SqsService,
        crm_service_1.CrmService])
], MessagingService);
//# sourceMappingURL=messaging.service.js.map
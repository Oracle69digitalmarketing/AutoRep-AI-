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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const client_sqs_1 = require("@aws-sdk/client-sqs");
const ai_service_1 = require("../modules/ai/ai.service");
const chat_gateway_1 = require("../modules/messaging/chat.gateway");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const queueUrl = process.env.SQS_QUEUE_URL;
const sqsClient = new client_sqs_1.SQSClient({ region: process.env.AWS_REGION });
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const aiService = app.get(ai_service_1.AiService);
    const chatGateway = app.get(chat_gateway_1.ChatGateway);
    console.log('SQS worker started, polling...');
    while (true) {
        try {
            const receiveCommand = new client_sqs_1.ReceiveMessageCommand({
                QueueUrl: queueUrl,
                MaxNumberOfMessages: 1,
                WaitTimeSeconds: 20,
            });
            const { Messages } = await sqsClient.send(receiveCommand);
            if (Messages && Messages.length > 0) {
                const message = Messages[0];
                if (message.Body) {
                    const payload = JSON.parse(message.Body);
                    console.log('Processing message:', payload);
                    const { originationNumber, messageBody } = payload;
                    const dto = { title: `Lead ${originationNumber}`, content: messageBody };
                    const aiResponse = await aiService.generateReport(dto);
                    chatGateway.server.emit('receiveMessage', {
                        sender: 'ai',
                        text: aiResponse.aiSummary,
                        leadId: originationNumber,
                    });
                    const deleteCommand = new client_sqs_1.DeleteMessageCommand({
                        QueueUrl: queueUrl,
                        ReceiptHandle: message.ReceiptHandle,
                    });
                    await sqsClient.send(deleteCommand);
                }
            }
        }
        catch (error) {
            console.error('SQS worker error:', error);
            await new Promise(r => setTimeout(r, 5000));
        }
    }
}
bootstrap().catch(console.error);
//# sourceMappingURL=sqs.worker.js.map
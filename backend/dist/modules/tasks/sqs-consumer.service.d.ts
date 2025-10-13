import { AiService } from '../ai/ai.service';
import { MessagingService } from '../messaging/messaging.service';
import { SQSRecord } from 'aws-lambda';
export declare class SqsConsumerService {
    private readonly aiService;
    private readonly messagingService;
    private readonly sqsClient;
    private readonly queueUrl;
    constructor(aiService: AiService, messagingService: MessagingService);
    processMessages(messages: SQSRecord[]): Promise<void>;
    private processMessage;
    private deleteMessage;
}

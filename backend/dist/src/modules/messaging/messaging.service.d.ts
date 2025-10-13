import { AiService } from '../ai/ai.service';
import { SqsService } from '../../infra/sqs.service';
import { CrmService } from '../crm/crm.service';
export declare class MessagingService {
    private readonly aiService;
    private readonly sqsService;
    private readonly crmService;
    private pinpointClient;
    constructor(aiService: AiService, sqsService: SqsService, crmService: CrmService);
    handleIncomingMessage(payload: any): Promise<{
        status: string;
    }>;
    sendMessage(destinationNumber: string, message: string): Promise<import("@aws-sdk/client-pinpoint").SendMessagesCommandOutput>;
}

import { S3Service } from '../../infra/s3.service';
import { MessagingService } from '../messaging/messaging.service';
import { CrmService } from '../crm/crm.service';
export declare class FunnelExecutionService {
    private readonly s3Service;
    private readonly messagingService;
    private readonly crmService;
    constructor(s3Service: S3Service, messagingService: MessagingService, crmService: CrmService);
    executeFunnel(funnelId: string, leadId: string): Promise<{
        status: string;
    }>;
}

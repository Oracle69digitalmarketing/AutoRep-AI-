import { DynamodbService } from '../../infra/dynamodb.service';
import { FunnelExecutionService } from '../funnels/funnel-execution.service';
export declare class CrmService {
    private readonly dynamodbService;
    private readonly funnelExecutionService;
    constructor(dynamodbService: DynamodbService, funnelExecutionService: FunnelExecutionService);
    createAgent(agentData: any): Promise<{
        [key: string]: any;
    } | null>;
    createLead(leadData: any): Promise<{
        [key: string]: any;
    } | null>;
    getLead(id: string): Promise<{
        [key: string]: any;
    } | null>;
    updateLead(id: string, leadData: any): Promise<{
        [key: string]: any;
    } | null>;
    deleteLead(id: string): Promise<{
        id: string;
    }>;
    private mapToDynamoDB;
    private mapFromDynamoDB;
    private buildUpdateExpressions;
    triggerFunnel(leadId: string, funnelId: string): Promise<{
        status: string;
    }>;
    assignAgentToLead(leadId: string, agentId: string): Promise<{
        [key: string]: any;
    } | null>;
}

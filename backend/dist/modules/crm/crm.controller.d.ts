import { CrmService } from './crm.service';
export declare class CrmController {
    private readonly crmService;
    constructor(crmService: CrmService);
    createAgent(agentData: any): Promise<{
        [key: string]: any;
    } | null>;
    assignAgentToLead(leadId: string, agentId: string): Promise<{
        [key: string]: any;
    } | null>;
    triggerFunnel(id: string, body: {
        funnelId: string;
    }): Promise<{
        status: string;
    }>;
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
}

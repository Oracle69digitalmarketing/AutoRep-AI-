import { CommissionsService } from './commissions.service';
export declare class CommissionsController {
    private readonly commissionsService;
    constructor(commissionsService: CommissionsService);
    recordSale(body: {
        agentId: string;
        amount: number;
    }): Promise<{
        [key: string]: any;
    } | null>;
    getCommissionsForAgent(agentId: string): Promise<({
        [key: string]: any;
    } | null)[]>;
}

import { AdminService } from './admin.service';
import { Request } from 'express';
export declare class AdminController {
    private readonly svc;
    constructor(svc: AdminService);
    leads(req: Request): Promise<{
        totalLeads: number;
        topLeads: ({
            [key: string]: any;
        } | null)[];
    }>;
}

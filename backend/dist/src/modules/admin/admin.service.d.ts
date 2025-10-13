export declare class AdminService {
    private leadRepo;
    getLeadsSummary(): Promise<{
        totalLeads: number;
        topLeads: never[];
    }>;
}

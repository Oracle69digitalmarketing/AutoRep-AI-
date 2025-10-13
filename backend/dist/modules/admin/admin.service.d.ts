import { DynamodbService } from '../../infra/dynamodb.service';
export declare class AdminService {
    private readonly dynamodbService;
    constructor(dynamodbService: DynamodbService);
    getLeadsSummary(): Promise<{
        totalLeads: number;
        topLeads: ({
            [key: string]: any;
        } | null)[];
    }>;
}

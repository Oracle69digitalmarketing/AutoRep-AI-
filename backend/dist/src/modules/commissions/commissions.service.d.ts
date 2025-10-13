import { DynamodbService } from '../../infra/dynamodb.service';
export declare class CommissionsService {
    private readonly dynamodbService;
    private readonly commissionRate;
    constructor(dynamodbService: DynamodbService);
    recordSale(agentId: string, amount: number): Promise<{
        [key: string]: any;
    } | null>;
    getCommissionsForAgent(agentId: string): Promise<({
        [key: string]: any;
    } | null)[]>;
    private mapFromDynamoDB;
}

import { CrmService } from '../crm/crm.service';
import { CreateReportDto } from '../../common/dto/create-report.dto';
import { DynamodbService } from '../../infra/dynamodb.service';
export declare class AiService {
    private readonly dynamodbService;
    private readonly crmService;
    private bedrockClient;
    private sageMakerClient;
    private bedrockModelId;
    private sageMakerEndpoint;
    constructor(dynamodbService: DynamodbService, crmService: CrmService);
    getAiResponse(leadId: string, message: string): Promise<string>;
    private createPromptForRoleDetection;
    private parseRoleDetectionResponse;
    private invokeAiModel;
    private getSageMakerResponse;
    generateReport(dto: CreateReportDto): Promise<{
        id: `${string}-${string}-${string}-${string}-${string}`;
        title: string;
        aiSummary: string;
        createdAt: string;
    }>;
}

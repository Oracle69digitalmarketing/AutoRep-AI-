import { AiService } from './ai.service';
import { CreateReportDto } from '../../common/dto/create-report.dto';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    getAiResponse(dto: CreateReportDto): Promise<{
        id: `${string}-${string}-${string}-${string}-${string}`;
        title: string;
        aiSummary: string;
        createdAt: string;
    }>;
}

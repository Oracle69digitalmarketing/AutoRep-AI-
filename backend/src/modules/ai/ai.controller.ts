import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { CreateReportDto } from '../../common/dto/create-report.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  async getAiResponse(@Body() dto: CreateReportDto) {
    return this.aiService.generateReport(dto);
  }
}

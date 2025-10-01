import { Controller, Post, Body } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from '../../common/dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async generateReport(@Body() dto: CreateReportDto) {
    return this.reportsService.generateReport(dto);
  }
}

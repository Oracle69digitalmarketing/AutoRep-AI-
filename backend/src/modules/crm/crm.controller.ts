import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CrmService } from './crm.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('crm')
@UseGuards(JwtAuthGuard)
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Post('leads/:id/trigger-funnel')
  triggerFunnel(@Param('id') id: string, @Body() body: { funnelId: string }) {
    return this.crmService.triggerFunnel(id, body.funnelId);
  }

  @Post('leads')
  createLead(@Body() leadData: any) {
    return this.crmService.createLead(leadData);
  }

  @Get('leads/:id')
  getLead(@Param('id') id: string) {
    return this.crmService.getLead(id);
  }

  @Put('leads/:id')
  updateLead(@Param('id') id: string, @Body() leadData: any) {
    return this.crmService.updateLead(id, leadData);
  }

  @Delete('leads/:id')
  deleteLead(@Param('id') id: string) {
    return this.crmService.deleteLead(id);
  }
}
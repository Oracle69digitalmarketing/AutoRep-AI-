import { Controller, UseGuards, Post, Body, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommissionsService } from './commissions.service';

@Controller('commissions')
@UseGuards(JwtAuthGuard)
export class CommissionsController {
  constructor(private readonly commissionsService: CommissionsService) {}

  @Post('sales')
  recordSale(@Body() body: { agentId: string; amount: number }) {
    return this.commissionsService.recordSale(body.agentId, body.amount);
  }

  @Get('agents/:agentId')
  getCommissionsForAgent(@Param('agentId') agentId: string) {
    return this.commissionsService.getCommissionsForAgent(agentId);
  }
}
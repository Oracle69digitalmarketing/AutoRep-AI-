import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly svc: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Get('leads')
  async leads(@Req() req: Request) {
    return this.svc.getLeadsSummary();
  }
}

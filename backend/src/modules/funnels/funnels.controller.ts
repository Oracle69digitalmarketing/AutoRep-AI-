import { Controller, Post, Body } from '@nestjs/common';
import { FunnelsService } from './funnels.service';

@Controller('funnels')
export class FunnelsController {
  constructor(private readonly funnelsService: FunnelsService) {}

  @Post()
  async saveFunnel(@Body() funnelData: any) {
    return this.funnelsService.saveFunnel(funnelData);
  }
}
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { MessagingService } from './messaging.service';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly svc: MessagingService) {}

  @Post('webhook')
  async webhook(@Body() body: any, @Res() res: Response) {
    await this.svc.handleIncomingMessage(body);
    return res.status(200).send();
  }
}

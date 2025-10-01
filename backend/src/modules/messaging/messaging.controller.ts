import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MessagingService } from './messaging.service';
import { body } from 'express-validator';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly svc: MessagingService) {}

  @Post('webhook')
  async webhook(@Req() req: Request, @Res() res: Response) {
    const body = req.body || {};
    const from = body.From || body.from;
    const to = body.To || body.to;
    const text = body.Body || body.Body || '';
    await this.svc.handleIncomingMessage({ from, to, text, raw: body });
    return res.send('<Response></Response>');
  }
}

import { Injectable } from '@nestjs/common';
import { S3Service } from '../../infra/s3.service';
import { MessagingService } from '../messaging/messaging.service';
import { CrmService } from '../crm/crm.service';

@Injectable()
export class FunnelExecutionService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly messagingService: MessagingService,
    private readonly crmService: CrmService,
  ) {}

  async executeFunnel(funnelId: string, leadId: string) {
    const key = `funnels/${funnelId}.json`;
    const funnel = await this.s3Service.getObject(key);
    const funnelSteps = JSON.parse(funnel.Body.toString());

    const lead = await this.crmService.getLead(leadId);

    for (const step of funnelSteps) {
      if (step.type === 'send-message') {
        await this.messagingService.sendMessage(lead.phone, step.message);
      } else if (step.type === 'wait-for-reply') {
        // Placeholder for wait logic
        await new Promise(r => setTimeout(r, 5000));
      }
    }

    return { status: 'completed' };
  }
}
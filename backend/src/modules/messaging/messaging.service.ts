import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { SqsService } from '../../infra/sqs.service';
import { CrmService } from '../crm/crm.service';
import { PinpointClient, SendMessagesCommand } from '@aws-sdk/client-pinpoint';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MessagingService {
  private pinpointClient: PinpointClient;

  constructor(
    @Inject(forwardRef(() => AiService)) private readonly aiService: AiService,
    private readonly sqsService: SqsService,
    private readonly crmService: CrmService,
  ) {
    this.pinpointClient = new PinpointClient({ region: process.env.AWS_REGION });
  }

  async handleIncomingMessage(payload: any) {
    const { originationNumber, messageBody } = payload;
    let lead = await this.crmService.getLead(originationNumber);
    if (!lead) {
      lead = await this.crmService.createLead({ id: originationNumber, name: originationNumber, phone: originationNumber });
    }
    await this.crmService.updateLead(lead.id, { lastMessage: messageBody });

    console.log(`Queueing message from ${originationNumber}: ${messageBody}`);
    await this.sqsService.sendMessage(payload);

    return { status: 'queued' };
  }

  async sendMessage(destinationNumber: string, message: string) {
    const command = new SendMessagesCommand({
      ApplicationId: process.env.PINPOINT_APPLICATION_ID,
      MessageRequest: {
        Addresses: {
          [destinationNumber]: {
            ChannelType: 'SMS',
          },
        },
        MessageConfiguration: {
          SMSMessage: {
            Body: message,
            MessageType: 'TRANSACTIONAL',
          },
        },
      },
    });
    return this.pinpointClient.send(command);
  }
}
import { Injectable } from '@nestjs/common';
import { S3Service } from '../../infra/s3.service';
import { randomUUID } from 'crypto';

@Injectable()
export class FunnelsService {
  constructor(private readonly s3Service: S3Service) {}

  async saveFunnel(funnelData: any) {
    const funnelId = randomUUID();
    const key = `funnels/${funnelId}.json`;
    await this.s3Service.putObject(key, JSON.stringify(funnelData));
    return { funnelId };
  }
}
import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../ormconfig';
import { Lead } from '../../entities/lead.entity';

@Injectable()
export class AdminService {
  private leadRepo = AppDataSource.getRepository(Lead);

  async getLeadsSummary() {
    const count = await this.leadRepo.count();
    const top = await this.leadRepo.find({ order: { score: 'DESC' }, take: 10 });
    return { totalLeads: count, topLeads: top };
  }
}

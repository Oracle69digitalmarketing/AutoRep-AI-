import { DataSource } from 'typeorm';
import { Report } from './src/entities/report.entity';
import { Task } from './src/entities/task.entity';
import { Lead } from './src/entities/lead.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_NAME || 'autorep.sqlite',
  synchronize: true,
  logging: false,
  entities: [Report, Task, Lead]
});

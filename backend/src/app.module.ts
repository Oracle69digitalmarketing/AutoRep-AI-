import { Module } from '@nestjs/common';
import { ReportsModule } from './modules/reports/reports.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { AppDataSource } from '../ormconfig';

@Module({
  imports: [ReportsModule, TasksModule, AuthModule, MessagingModule],
})
export class AppModule {
  constructor() {
    AppDataSource.initialize()
      .then(() => console.log('✅ Database initialized'))
      .catch((err) => {
        console.error('DB init error', err);
        process.exit(1);
      });
  }
}

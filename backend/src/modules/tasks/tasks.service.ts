import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../ormconfig';
import { Task } from '../../entities/task.entity';
import { CreateTaskDto } from '../../common/dto/create-task.dto';

@Injectable()
export class TasksService {
  private repo = AppDataSource.getRepository(Task);

  async createTask(dto: CreateTaskDto) {
    const t = new Task();
    t.title = dto.title;
    t.dueDate = dto.dueDate;
    return this.repo.save(t);
  }

  async listTasks() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}

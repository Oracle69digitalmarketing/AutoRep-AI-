import { Controller, Post, Body, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../../common/dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @Get()
  listTasks() {
    return this.tasksService.listTasks();
  }
}

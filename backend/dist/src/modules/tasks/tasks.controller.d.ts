import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../../common/dto/create-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    createTask(dto: CreateTaskDto): Promise<any>;
    listTasks(): Promise<never[]>;
}

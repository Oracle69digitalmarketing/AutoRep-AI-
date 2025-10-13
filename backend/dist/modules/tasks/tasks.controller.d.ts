import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../../common/dto/create-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    createTask(dto: CreateTaskDto): Promise<{
        title: string;
        dueDate?: string;
        id: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    listTasks(): Promise<({
        [key: string]: any;
    } | null)[]>;
}

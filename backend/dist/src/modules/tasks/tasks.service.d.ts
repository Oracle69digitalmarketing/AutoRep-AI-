import { CreateTaskDto } from '../../common/dto/create-task.dto';
export declare class TasksService {
    private repo;
    createTask(dto: CreateTaskDto): Promise<any>;
    listTasks(): Promise<never[]>;
}

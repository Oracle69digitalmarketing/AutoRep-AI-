import { DynamodbService } from '../../infra/dynamodb.service';
import { CreateTaskDto } from '../../common/dto/create-task.dto';
export declare class TasksService {
    private readonly dynamodbService;
    constructor(dynamodbService: DynamodbService);
    createTask(dto: CreateTaskDto): Promise<{
        title: string;
        dueDate?: string;
        id: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    listTasks(): Promise<({
        [key: string]: any;
    } | null)[]>;
}

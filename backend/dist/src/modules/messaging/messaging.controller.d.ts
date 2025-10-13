import { Response } from 'express';
import { MessagingService } from './messaging.service';
export declare class MessagingController {
    private readonly svc;
    constructor(svc: MessagingService);
    webhook(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
}

import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class NotificationsGateway implements OnGatewayInit {
    server: Server;
    afterInit(): void;
    notifyLeadCreated(lead: any): void;
}

import { io } from 'socket.io-client';
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
export const socket = io(BACKEND, { transports: ['websocket'] });

import Redis from 'ioredis';
import * as dotenv from 'dotenv';
dotenv.config();

const url = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
export const redis = new Redis(url);

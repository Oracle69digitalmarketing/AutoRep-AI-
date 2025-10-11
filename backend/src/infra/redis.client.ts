import Redis from 'ioredis';
import * as dotenv from 'dotenv';
dotenv.config();

const url = process.env.ELASTICACHE_REDIS_ENDPOINT || 'redis://127.0.0.1:6379';
export const redis = new Redis(url);

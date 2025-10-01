import { redis } from './redis.client';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const BACKEND = process.env.BACKEND_URL || 'http://localhost:4000';

async function worker() {
  console.log('Queue worker started, polling every 3s');
  while (true) {
    try {
      // BRPOP block for 5s
      const res = await redis.brpop('vertex:queue', 5);
      if (!res) {
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
      const payload = JSON.parse(res[1]);
      console.log('Processing queued prompt', payload.id);
      // forward to backend reports endpoint to perform vertex call
      await axios.post(`${BACKEND}/reports`, { title: payload.title, content: payload.content });
    } catch (err) {
      console.error('Worker error', err.message || err);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

worker().catch(console.error);

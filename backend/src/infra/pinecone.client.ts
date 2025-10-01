import { PineconeClient } from '@pinecone-database/pinecone';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new PineconeClient();

export async function initPinecone() {
  if (!process.env.PINECONE_API_KEY) return null;
  await client.init({
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || ''
  });
  return client;
}

export function getIndex(name: string) {
  return client.Index(name);
}

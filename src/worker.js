import { Worker } from 'bullmq';
import { createRedisConnection } from '../config/redis.js';
import { processJobWithLock } from './redis-lock.js';

const worker = new Worker('taskQueue', async (job) => {
    console.log(`Processing job ${job.id} with data:`, job.data);
    await processJobWithLock(job);
    console.log(`Job ${job.id} completed`);
}, { connection: createRedisConnection() });

worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed: ${err.message}`);
});

export default worker;
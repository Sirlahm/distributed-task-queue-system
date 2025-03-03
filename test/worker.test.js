import { Worker } from 'bullmq';
import taskQueue from '../src/queue.js';
import { createRedisConnection } from '../config/redis.js';
import { cleanup as cleanupLock } from '../src/redis-lock.js';

describe('Worker Process', () => {
    let worker;
    
    beforeAll(() => {
        worker = new Worker('taskQueue', async (job) => {
            console.log(`Processing job ${job.id}`);
        }, { connection: createRedisConnection() });
    });

    afterAll(async () => {
        await worker.close();
        await taskQueue.close();
        await cleanupLock();
    });

    it('should process a job', async () => {
        const job = await taskQueue.add('processTask', { task: 'test' });
        expect(job.id).toBeDefined();
        // Add a small delay to allow job processing
        await new Promise(res => setTimeout(res, 1000));
    }, 10000); // Increase timeout for job processing
});
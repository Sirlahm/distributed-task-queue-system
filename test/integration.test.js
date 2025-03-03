import request from 'supertest';
import app from '../src/producer';
import taskQueue from '../src/queue.js';
import { Worker } from 'bullmq';
import { createRedisConnection } from '../config/redis.js';

describe('Integration Testing', () => {
    let worker;
    beforeAll(() => {
        worker = new Worker('taskQueue', async (job) => {
            console.log(`Processing job ${job.id}`);
        }, { connection: createRedisConnection() });
    });

    afterAll(async () => {
        await worker.close();
        await taskQueue.close();
    });

    it('should enqueue and process a job end-to-end', async () => {
        const res = await request(app).post('/enqueue').send({ task: 'integration-test' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('jobId');

        const job = await taskQueue.getJob(res.body.jobId);
        expect(job).not.toBeNull();
    });
});
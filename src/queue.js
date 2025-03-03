import { Queue } from 'bullmq';
import { createRedisConnection } from '../config/redis.js';

const taskQueue = new Queue('taskQueue', {
    connection: createRedisConnection(),
    defaultJobOptions: {
        attempts: 5,
        backoff: { type: 'exponential', delay: 2000 },
    }
});

export default taskQueue
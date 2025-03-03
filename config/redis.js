import Redis from 'ioredis';

export const redisOptions = {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};

export const createRedisConnection = () => new Redis(redisOptions);
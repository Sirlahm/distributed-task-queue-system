import Redlock from "redlock";
import { createRedisConnection } from "../config/redis.js";

const redisClient = createRedisConnection();
const redlock = new Redlock([redisClient], {
  retryCount: 3,
  retryDelay: 200,
});

export async function processJobWithLock(job) {
  let lock = null;
  try {
    lock = await redlock.lock(`lock:${job.id}`, 5000);
    console.log(`Lock acquired for job ${job.id}`);
    await new Promise((res) => setTimeout(res, 3000));
    await lock.unlock();
    console.log(`Lock released for job ${job.id}`);
  } catch (err) {
    console.error(`Lock failed: ${err.message}`);
    if (lock) {
      try {
        await lock.unlock();
      } catch (unlockError) {
        console.error(`Failed to release lock: ${unlockError.message}`);
      }
    }
    throw err;
  }
}

export const cleanup = async () => {
  await redisClient.quit();
};

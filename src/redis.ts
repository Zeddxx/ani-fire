import Redis from "ioredis";
import { ApiResponse } from "./types/anime";

const getRedisConnectionURL = (): string => {
  if (process.env.NODE_ENV === "development") return "";
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }

  throw new Error("[REDIS]: Redis Connection URL is must!");
};

export const redis = new Redis(getRedisConnectionURL());

export async function storeOrGetFromRedis<T>(
  key: string,
  fetch: () => Promise<T>,
  tts = 3600,
) {
  if (!key) {
    throw new Error("[Key] is must!");
  }
  try {
    const cachedData = await redis.get(key);

    if (cachedData) {
      console.log("[Redis]: Cached from redis DB");
      return JSON.parse(cachedData) as ApiResponse<T>;
    }

    console.log("[API]: Fetched from API!");
    const response = await fetch();

    await redis.set(key, JSON.stringify(response), "EX", tts);

    console.log("[API]: Stored on Redis!");
    return response;
  } catch (error) {
    console.log(error);
  }
}

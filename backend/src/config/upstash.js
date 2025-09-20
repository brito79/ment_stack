import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const redis = Redis.fromEnv();

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "20 s"), 
  prefix: "ratelimit", 
});

export default rateLimit;

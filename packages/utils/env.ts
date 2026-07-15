import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  SALT_ROUNDS: z.string().describe("salt rounds for pass hashing"),
  JWT_ACCESS_SECRET: z.string().describe("JWT Access Secret"),
  JWT_REFRESH_SECRET: z.string().describe("JWT Refresh Secret"),
  REDIS_URL: z.string().describe("Redis URL"),
  ARGON_MEMORY_COST: z.coerce.number().default(4096).describe("Argon2 Memory Cost (in KiB)"),
  ARGON_TIME_COST: z.coerce.number().default(4).describe("Argon2 Time Cost (iterations)"),
  ARGON_HASH_LENGTH: z.coerce.number().default(40).describe("Argon2 Hash Output Length (bytes)"),
  ARGON_PARALLELISM: z.coerce.number().default(1).describe("Argon2 Parallelism (threads)"),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) {
    console.error("❌ Invalid environment variables in @repo/utils:", safeParseResult.error.format());
    throw new Error(safeParseResult.error.message);
  }
  return safeParseResult.data;
}

export const env = createEnv(process.env);

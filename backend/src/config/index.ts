import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Environment schema validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('8080'),
  HOST: z.string().default('0.0.0.0'),
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
  ANTHROPIC_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  AI_PROVIDER: z.enum(['anthropic', 'openai']).default('anthropic'),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

// Export configuration object
export const config = {
  env: env.NODE_ENV,
  port: parseInt(env.PORT, 10),
  host: env.HOST,
  frontendUrl: env.FRONTEND_URL,
  databaseUrl: env.DATABASE_URL,
  redisUrl: env.REDIS_URL,
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
    refreshSecret: env.JWT_REFRESH_SECRET,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  },
  ai: {
    provider: env.AI_PROVIDER,
    anthropicApiKey: env.ANTHROPIC_API_KEY,
    openaiApiKey: env.OPENAI_API_KEY,
  },
  rateLimit: {
    windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS, 10),
    max: parseInt(env.RATE_LIMIT_MAX_REQUESTS, 10),
  },
  logLevel: env.LOG_LEVEL,
  isDevelopment: env.NODE_ENV === 'development',
  isProduction: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test',
} as const;

export default config;

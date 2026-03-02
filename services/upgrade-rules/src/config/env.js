import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const baseSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const isProd = process.env.NODE_ENV === 'production';

const devSchema = baseSchema.extend({
  DATABASE_URL_DEV: z.string().url(),
  REDIS_HOST_DEV: z.string().min(1),
  REDIS_PORT_DEV: z.coerce.number(),
  AUTH_HOST_DEV: z.string().min(1),
  AUTH_PORT_DEV: z.coerce.number(),
  AUTH_VER_DEV: z.string().min(1),
});

const prodSchema = baseSchema.extend({
  DATABASE_URL_PROD: z.string().url(),
  REDIS_HOST_PROD: z.string().min(1),
  REDIS_PORT_PROD: z.coerce.number(),
  AUTH_HOST_PROD: z.string().min(1),
  AUTH_PORT_PROD: z.coerce.number(),
  AUTH_VER_PROD: z.string().min(1),
});

const schema = isProd ? prodSchema : devSchema;

const env = schema.parse(process.env);

export default env;

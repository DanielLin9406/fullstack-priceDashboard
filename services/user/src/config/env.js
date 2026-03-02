import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CLIENT_ID: z.string().min(1),
  CLIENT_SECRET: z.string().min(1),
  REDIRECT_URI: z.string().url(),
  PORT: z.coerce.number().default(4999)
});

const env = schema.parse(process.env);

export default env;

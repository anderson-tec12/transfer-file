import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  SFTP_HOST: z.string(),
  SFTP_PORT: z.coerce.number().default(2),
  SFTP_USERNAME: z.string(),
  SFTP_PASS: z.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data

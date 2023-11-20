import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().default(8000),
	NODE_ENV: z.enum(['dev', 'production', 'test']),
	SECRET: z.string(),
	DATABASE_URL: z.string()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) throw new Error('Erro na variável de ambiente')

export const env = _env.data
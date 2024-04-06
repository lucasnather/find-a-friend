import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number()
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
    console.error('Environemnt Variable error')

    throw new Error('Environemnt Variable error')
}

export const env = _env.data
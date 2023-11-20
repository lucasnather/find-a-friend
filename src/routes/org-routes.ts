import { authenticate } from '@/controller/org/authenticate'
import { refreshTokenAuthenticate } from '@/controller/org/refresh-token-authenticate'
import { register } from '@/controller/org/register'
import { FastifyInstance } from 'fastify'

export async function orgRoutes(app: FastifyInstance) {

	app.post('/', register)
	app.post('/login', authenticate)
	app.post('/refresh-token', refreshTokenAuthenticate)
}
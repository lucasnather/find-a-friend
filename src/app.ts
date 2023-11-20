import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import multer from 'fastify-multer'
import { env } from './env/env'
import { ZodError } from 'zod'
import { orgRoutes } from './routes/org-routes'
import { petsRoutes } from './routes/pets-routes'
import { fotosRoutes } from './routes/fotos-routes'

export const app = fastify()

app.register(fastifyCors, {
	origin: '*',
	methods: ['POST', 'GET']
})

app.register(multer.contentParser)

app.register(fastifyCookie)

app.register(fastifyJwt, {
	secret: env.SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false
	}
})

app.register(orgRoutes, {
	prefix: '/org'
})

app.register(petsRoutes, {
	prefix: '/pet'
})

app.register(fotosRoutes, {
	prefix: '/upload'
})

app.setErrorHandler((err, _, reply) => {
	if (err instanceof ZodError) {
		return reply.status(404).send({
			message: 'Validation Error',
			issues: err.format()
		})
	}

	return reply.status(500).send({
		message: 'Erro interno do servidor'
	})
})
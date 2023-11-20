
import { InvalidCredentialsError } from '@/error/invalid-credentials-error'
import { makeAuthenticateOrg } from '@/factory/make-authenticate-org'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

	const getBodySchema = z.object({
		email: z.string(),
		senha: z.string()
	})

	const { email, senha } = getBodySchema.parse(request.body)

	const authenticateOrgService = makeAuthenticateOrg()

	try {
		const { org } = await authenticateOrgService.execute({
			email,
			senha
		})

		const token = await reply.jwtSign({}, {
			sub: org.id,
			expiresIn: '10m'
		})

		const refreshToken = await reply.jwtSign({}, {
			sub: org.id,
			expiresIn: '1d'
		})

		reply.setCookie('refreshToken', refreshToken, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: true
		})

		return reply.status(200).send({ token, message: 'Usuário logado' })
	} catch (e) {
		if (e instanceof InvalidCredentialsError) {
			reply.status(404).send({
				message: e.message
			})
		}
	}
}
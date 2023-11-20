import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshTokenAuthenticate(request: FastifyRequest, reply: FastifyReply) {

	await request.jwtVerify({ onlyCookie: true })

	const { sub } = request.user

	const token = await reply.jwtSign({}, {
		sub,
		expiresIn: '10m'
	})

	const refreshToken = await reply.jwtSign({}, {
		sub,
		expiresIn: '1d'
	})

	reply.setCookie('refreshToken', refreshToken, {
		httpOnly: true,
		path: '/',
		sameSite: true,
		secure: true
	})

	return reply.status(200).send({ token, message: 'Usuário logado' })
}
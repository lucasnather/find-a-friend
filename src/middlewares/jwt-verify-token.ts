import { FastifyReply, FastifyRequest } from 'fastify'

export async function jwtVerifyToken(request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.jwtVerify()
	} catch (e) {
		reply.status(404).send({
			message: 'Você não tem autenticação'
		})
	}
}
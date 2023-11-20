import { FotoNaoEncotradaError } from '@/error/foto-nao-encontrada-error'
import { makeFindFoto } from '@/factory/make-find-id-foto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function readById(request: FastifyRequest, reply: FastifyReply) {
	const getParamsSchema = z.object({
		petId: z.string()
	})

	const { petId } = getParamsSchema.parse(request.params)

	const findManyFotosService = makeFindFoto()

	try {
		const { foto } = await findManyFotosService.execute({
			petId
		})

		return reply.status(200).send(foto)
	} catch (error) {
		if (error instanceof FotoNaoEncotradaError) {
			return reply.status(404).send({
				message: error.message
			})
		}
	}
}
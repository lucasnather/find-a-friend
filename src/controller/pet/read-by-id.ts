import { ResourceNotFoundError } from '@/error/resource-not-found-error'
import { makeFindPet } from '@/factory/make-find-id-pets'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function readById(request: FastifyRequest, reply: FastifyReply) {
	const getParamsSchema = z.object({
		id: z.string()
	})

	const { id } = getParamsSchema.parse(request.params)

	const findUniquePetsService = makeFindPet()

	try {
		const { pet } = await findUniquePetsService.execute({
			id
		})

		return reply.status(200).send(pet)
	} catch (e) {
		if (e instanceof ResourceNotFoundError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}
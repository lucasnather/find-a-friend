import { CidadeNaoExistePetCadastradoError } from '@/error/cidade-nao-existe-cadstrada-error'
import { makeSearchPet } from '@/factory/make-search-pets'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function readByCity(request: FastifyRequest, reply: FastifyReply) {
	const getParamsSchema = z.object({
		cidade: z.string()
	})

	const { cidade } = getParamsSchema.parse(request.params)

	const searchManyPetsService = makeSearchPet()

	try {
		const { pet } = await searchManyPetsService.execute({
			cidade
		})

		return reply.status(200).send(pet)
	} catch (e) {
		if (e instanceof CidadeNaoExistePetCadastradoError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}
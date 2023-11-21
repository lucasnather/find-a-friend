import { PetWithoutAnyCharactersError } from '@/error/pet-without-any-characters-error'
import { makeFilterPet } from '@/factory/make-filter-pets'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function filterByCharacter(request: FastifyRequest, reply: FastifyReply) {
	const getQuerySchema = z.object({
		idade: z.enum(['FILHOTE', 'JOVEM', 'ADULTO', 'IDOSO']).optional(),
		porte: z.enum(['PEQUENINO', 'MEDIO', 'GRANDE']).optional(),
		energia: z.enum(['BAIXA', 'MEDIA', 'ALTA']).optional(),
		dependencia: z.enum(['BAIXA', 'MEDIA', 'ALTA']).optional(),
		ambiente: z.enum(['AMPLO', 'MEDIO', 'PEQUENO']).optional(),
		especie: z.enum(['GATO', 'CACHORRO']).optional(),
	})

	const { idade, porte, energia, dependencia, ambiente, especie } = getQuerySchema.parse(request.query)

	const filterManyPetsService = makeFilterPet()

	try {
		const { pet } = await filterManyPetsService.execute({
			idade: !idade ? undefined : idade,
			porte: !porte ? undefined : porte,
			energia: !energia ? undefined : energia,
			dependencia: !dependencia ? undefined : dependencia,
			ambiente: !ambiente ? undefined : ambiente,
			especie: !especie ? undefined : especie
		})

		return reply.status(200).send(pet)
	} catch (e) {
		if (e instanceof PetWithoutAnyCharactersError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}
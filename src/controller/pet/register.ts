import { OrgNotExistsError } from '@/error/org-not-exists-error'
import { makeCreatePet } from '@/factory/make-create-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {

	const getBodySchema = z.object({
		nome: z.string(),
		cidade: z.string(),
		sobre: z.string().max(300, 'No máximo 300 caracteres'),
		idade: z.enum(['FILHOTE', 'JOVEM', 'ADULTO', 'IDOSO']),
		porte: z.enum(['PEQUENINO', 'MEDIO', 'GRANDE']),
		energia: z.enum(['BAIXA', 'MEDIA', 'ALTA']),
		dependencia: z.enum(['BAIXA', 'MEDIA', 'ALTA']),
		ambiente: z.enum(['AMPLO', 'MEDIO', 'PEQUENO']),
		especie: z.enum(['GATO', 'CACHORRO']),
		requesitos: z.string().nullable(),
		org_id: z.string(),
	})

	const { nome, cidade, sobre, idade, porte, energia, dependencia, ambiente, especie, requesitos, org_id } = getBodySchema.parse(request.body)

	const createPetService = makeCreatePet()

	try {
		const { pet } = await createPetService.execute({
			nome,
			cidade,
			sobre,
			idade,
			porte,
			energia,
			dependencia,
			ambiente,
			especie,
			requesitos,
			org_id
		})

		return reply.status(201).send({
			message: 'Pet criado com sucesso',
			pet
		})
	} catch (error) {
		if (error instanceof OrgNotExistsError) {
			return reply.status(404).send({
				message: error.message
			})
		}
	}
}
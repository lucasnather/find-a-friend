import { PetNotExistsWithIdError } from '@/error/pet-not-exists-with-id-error'
import { makeCreateFoto } from '@/factory/make-create-foto'
import { MulterRequest } from '@/interface/IMulter-request'
import { FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: MulterRequest, reply: FastifyReply) {
	const getBodySchema = z.object({
		petId: z.string()
	})

	const getFileSchema = z.object({
		originalname: z.string()
	})

	const { petId } = getBodySchema.parse(request.body)

	const { originalname } = getFileSchema.parse(request.file)

	const createFotoService = makeCreateFoto()

	try {
		await createFotoService.execute({
			imagem: originalname,
			pet_id: petId
		})

		return reply.status(201).send({
			message: 'Foto criada com sucesso'
		})
	} catch (error) {
		if (error instanceof PetNotExistsWithIdError) {
			return reply.status(401).send({
				message: error.message
			})
		}
	}
}
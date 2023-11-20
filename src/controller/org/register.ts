import { OrgAlreadyExistsError } from '@/error/org-already-exists-error'
import { makeCreateOrg } from '@/factory/make-create-org'
import { PassowordHash } from '@/utils/password-hash'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {

	const getBodySchema = z.object({
		nome: z.string(),
		email: z.string(),
		cep: z.string().min(8, 'O cep só pode conter números').max(8, 'O cep só pode conter números'),
		endereco: z.string().min(3, 'Endereço Obrigatório'),
		telefone: z.string().min(11, 'WhatsApp com ddd e sem espaços').max(11, 'WhatsApp com ddd e sem espaços'),
		senha: z.string().min(8, 'A senha deve conter no mínimo 8 caracteres'),
	})

	const { nome, email, cep, endereco, telefone, senha } = getBodySchema.parse(request.body)

	const passwordHash = new PassowordHash()
	const hash = await passwordHash.hashMyPassword(senha)

	const createOrgService = makeCreateOrg()

	try {
		const { org } = await createOrgService.execute({
			nome,
			email,
			cep,
			endereco,
			telefone,
			senha: hash
		})

		return reply.status(201).send({
			message: 'Org criada com sucesso',
			org
		})
	} catch (e) {
		if (e instanceof OrgAlreadyExistsError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}
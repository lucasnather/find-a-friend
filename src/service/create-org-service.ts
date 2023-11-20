import { OrgAlreadyExistsError } from '@/error/org-already-exists-error'
import { IOrg } from '@/interface/IOrg'
import { Org } from '@prisma/client'

interface CreateOrgServiceRequest {
	nome: string
	email: string
	cep: string
	endereco: string
	telefone: string
	senha: string
}

interface CreateOrgServiceResponse {
	org: Org
}

export class CreateOrgService {
	constructor(private orgRepository: IOrg) { }

	async execute(data: CreateOrgServiceRequest): Promise<CreateOrgServiceResponse> {
		const orgExists = await this.orgRepository.findByNameOrEmail(data.nome, data.email)

		if (orgExists) throw new OrgAlreadyExistsError()

		const org = await this.orgRepository.create(data)

		return {
			org
		}
	}
}
import { OrgNotExistsError } from '@/error/org-not-exists-error'
import { IOrg } from '@/interface/IOrg'
import { IPet } from '@/interface/IPets'
import { Pet } from '@prisma/client'

interface CreatePetServiceRequest {
	nome: string
	cidade: string
	sobre: string
	idade: 'FILHOTE' | 'JOVEM' | 'ADULTO' | 'IDOSO'
	porte: 'PEQUENINO' | 'MEDIO' | 'GRANDE'
	energia: 'BAIXA' | 'MEDIA' | 'ALTA'
	dependencia: 'BAIXA' | 'MEDIA' | 'ALTA'
	ambiente: 'AMPLO' | 'MEDIO' | 'PEQUENO',
	especie: 'GATO' | 'CACHORRO'
	requesitos?: string | null
	org_id: string
}

interface CreatePetServiceResponse {
	pet: Pet
}

export class CreatePetService {
	constructor(
		private petRepository: IPet,
		private orgRepository: IOrg) { }

	async execute(data: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
		const org = await this.orgRepository.findById(data.org_id)

		if (!org) throw new OrgNotExistsError()

		const pet = await this.petRepository.create(data)

		return {
			pet
		}
	}
}
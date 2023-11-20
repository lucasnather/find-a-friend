import { RecursoNaoEncontradoError } from '@/error/recurso-nao-encontrado-error'
import { IPet } from '@/interface/IPets'
import { Pet } from '@prisma/client'

interface FindUniquePetsServiceRequest {
	id: string
}

interface FindUniquePetsServiceResponse {
	pet: Pet
}

export class FindUniquePetsService {

	constructor(private petsRepository: IPet) { }

	async execute(data: FindUniquePetsServiceRequest): Promise<FindUniquePetsServiceResponse> {
		const pet = await this.petsRepository.findById(data.id)

		if (!pet) throw new RecursoNaoEncontradoError()

		return {
			pet
		}
	}
}
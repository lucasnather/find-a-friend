import { PetsSemCaracteristicasError } from '@/error/pets-sem-caracteristicas-error'
import { IPet } from '@/interface/IPets'
import { Pet } from '@prisma/client'

interface FilterManyPetsServiceRequest {
	idade?: 'FILHOTE' | 'JOVEM' | 'ADULTO' | 'IDOSO'
	porte?: 'PEQUENINO' | 'MEDIO' | 'GRANDE'
	energia?: 'BAIXA' | 'MEDIA' | 'ALTA'
	dependencia?: 'BAIXA' | 'MEDIA' | 'ALTA'
	ambiente?: 'AMPLO' | 'MEDIO' | 'PEQUENO'
	especie?: 'GATO' | 'CACHORRO'
}

interface FilterManyPetsServiceResponse {
	pet: Pet[]
}

export class FilterManyPetsService {

	constructor(private petsRepository: IPet) { }

	async execute(data: FilterManyPetsServiceRequest): Promise<FilterManyPetsServiceResponse> {
		const pet = await this.petsRepository.filterPetsByCharacter(data)

		if (pet?.length === 0 || !pet) throw new PetsSemCaracteristicasError()

		return {
			pet
		}
	}
}
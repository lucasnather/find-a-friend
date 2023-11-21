import { CityNotRegisterError } from '@/error/city-not-register-error'
import { IPet } from '@/interface/IPets'
import { Pet } from '@prisma/client'

interface SearchManyPetsServiceRequest {
	cidade: string
}

interface SearchManyPetsServiceResponse {
	pet: Pet[]
}

export class SearchManyPetsService {

	constructor(private petsRepository: IPet) { }

	async execute(data: SearchManyPetsServiceRequest): Promise<SearchManyPetsServiceResponse> {
		const pet = await this.petsRepository.findByCity(data.cidade)

		if (pet?.length === 0 || !pet) throw new CityNotRegisterError()

		return {
			pet
		}
	}
}
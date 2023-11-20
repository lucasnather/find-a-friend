import { FilterManyPetsService } from '@/service/filter-many-pets-service'
import { PetRepository } from '@/repository/prisma/pet-repository'

export function makeFilterPet() {
	const petRepository = new PetRepository()
	const filterManyPetsService = new FilterManyPetsService(petRepository)

	return filterManyPetsService
}
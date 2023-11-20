import { SearchManyPetsService } from './../service/search-many-pets-service'
import { PetRepository } from '@/repository/prisma/pet-repository'

export function makeSearchPet() {
	const petRepository = new PetRepository()
	const searchManyPetsService = new SearchManyPetsService(petRepository)

	return searchManyPetsService
}
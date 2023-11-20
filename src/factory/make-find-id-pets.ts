import { FindUniquePetsService } from './../service/find-unique-pet-service'
import { PetRepository } from '@/repository/prisma/pet-repository'

export function makeFindPet() {
	const petRepository = new PetRepository()
	const findUniquePetsService = new FindUniquePetsService(petRepository)

	return findUniquePetsService
}
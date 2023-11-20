import { OrgRepository } from '@/repository/prisma/org-repository'
import { PetRepository } from '@/repository/prisma/pet-repository'
import { CreatePetService } from '@/service/create-pet-service'


export function makeCreatePet() {
	const petRepository = new PetRepository()
	const orgRepository = new OrgRepository()
	const createPetService = new CreatePetService(petRepository, orgRepository)

	return createPetService
}
import { FotoRepository } from '@/repository/prisma/foto-repository'
import { PetRepository } from '@/repository/prisma/pet-repository'
import { CreateFotoService } from '@/service/create-foto-service'


export function makeCreateFoto() {
	const fotosRepository = new FotoRepository()
	const petRepository = new PetRepository()
	const createFotoService = new CreateFotoService(fotosRepository, petRepository)

	return createFotoService
}
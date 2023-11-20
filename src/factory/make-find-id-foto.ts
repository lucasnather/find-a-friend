import { FindManyFotosService } from './../service/find-many-fotos-service'
import { FotoRepository } from '@/repository/prisma/foto-repository'

export function makeFindFoto() {
	const fotosRepository = new FotoRepository()
	const findManyFotosService = new FindManyFotosService(fotosRepository)

	return findManyFotosService
}
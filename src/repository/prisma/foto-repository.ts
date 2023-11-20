import { prisma } from '@/database/prisma'
import { IFotos } from '@/interface/IFotos'
import { Prisma } from '@prisma/client'

export class FotoRepository implements IFotos {
	async findByIdPet(petId: string) {
		const foto = await prisma.foto.findMany({
			where: {
				pet_id: petId
			}
		})

		if (!foto) return null

		return foto
	}
	async create(data: Prisma.FotoUncheckedCreateInput) {
		const fotos = await prisma.foto.create({
			data
		})

		return fotos
	}

}
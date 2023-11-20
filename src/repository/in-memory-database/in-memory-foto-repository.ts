import { IFotos } from '@/interface/IFotos'
import { Foto, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryFotoRepository implements IFotos {

	private fotos: Foto[] = []

	async create(data: Prisma.FotoUncheckedCreateInput) {
		const foto: Foto = {
			id: randomUUID() ?? data.id,
			imagem: !data.imagem ? null : data.imagem,
			pet_id: data.pet_id
		}

		this.fotos.push(foto)

		return foto
	}

	async findByIdPet(petId: string) {
		const foto = this.fotos.find(foto => foto.pet_id === petId)

		if (!foto) return null

		return [foto]
	}

}
import { PetNotExistsWithIdError } from '@/error/pet-nao-existe--id-error'
import { IFotos } from '@/interface/IFotos'
import { IPet } from '@/interface/IPets'
import { Foto } from '@prisma/client'

interface CreateFotoServiceRequest {
	imagem?: string | null,
	pet_id: string
}

interface CreateFotoServiceResponse {
	foto: Foto
}

export class CreateFotoService {
	constructor(
		private fotoRepository: IFotos,
		private petsRepository: IPet) { }

	async execute(data: CreateFotoServiceRequest): Promise<CreateFotoServiceResponse> {
		const pet = await this.petsRepository.findById(data.pet_id)

		if (!pet) throw new PetNotExistsWithIdError()

		const foto = await this.fotoRepository.create(data)

		return {
			foto
		}
	}
}
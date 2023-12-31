import { PhotoNotFoundError } from '@/error/photo-not-found-error-error'
import { IFotos } from '@/interface/IFotos'
import { Foto } from '@prisma/client'

interface FindManyFotosServiceRequest {
	petId: string
}

interface FindManyFotosServiceResponse {
	foto: Foto[]
}

export class FindManyFotosService {

	constructor(private fotosrepository: IFotos) { }

	async execute(data: FindManyFotosServiceRequest): Promise<FindManyFotosServiceResponse> {
		const foto = await this.fotosrepository.findByIdPet(data.petId)

		if (foto?.length === 0 || !foto) throw new PhotoNotFoundError()

		return {
			foto
		}
	}
}
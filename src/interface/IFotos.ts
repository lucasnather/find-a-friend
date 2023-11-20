import { Foto, Prisma } from '@prisma/client'

export interface IFotos {
	create(data: Prisma.FotoUncheckedCreateInput): Promise<Foto>
	findByIdPet(petId: string): Promise<Foto[] | null>
}
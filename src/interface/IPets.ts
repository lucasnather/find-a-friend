import { Pet, Prisma } from '@prisma/client'

export interface FilterRequest {
	idade?: 'FILHOTE' | 'JOVEM' | 'ADULTO' | 'IDOSO'
	porte?: 'PEQUENINO' | 'MEDIO' | 'GRANDE'
	energia?: 'BAIXA' | 'MEDIA' | 'ALTA'
	dependencia?: 'BAIXA' | 'MEDIA' | 'ALTA'
	ambiente?: 'AMPLO' | 'MEDIO' | 'PEQUENO'
	especie?: 'GATO' | 'CACHORRO'
}

export interface IPet {
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
	findById(id: string): Promise<Pet | null>
	findByCity(cidade: string): Promise<Pet[] | null>
	filterPetsByCharacter(data: FilterRequest): Promise<Pet[] | null>
}
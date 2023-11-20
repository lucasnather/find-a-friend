import { FilterRequest, IPet } from '@/interface/IPets'
import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'


export class InMemoryPetRepository implements IPet {

	private pets: Pet[] = []

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet: Pet = {
			id: randomUUID() ?? data.id,
			ambiente: data.ambiente,
			cidade: data.cidade,
			dependencia: data.dependencia,
			energia: data.energia,
			especie: data.especie,
			idade: data.idade,
			nome: data.nome,
			org_id: data.org_id,
			porte: data.porte,
			requesitos: data.requesitos == null ? null : data.requesitos,
			sobre: data.sobre,
			createdAt: new Date()
		}

		this.pets.push(pet)

		return pet
	}

	async findById(id: string) {
		const pet = this.pets.find(pet => pet.id === id)

		if (!pet) return null
		return pet
	}

	async findByCity(cidade: string) {
		const pet = this.pets.find(pet => pet.cidade === cidade)

		if (!pet) return null

		return [
			pet
		]
	}

	async filterPetsByCharacter({
		ambiente,
		dependencia,
		energia,
		especie,
		idade,
		porte
	}: FilterRequest) {
		const pet = this.pets.find(pet => {
			return pet.ambiente === ambiente || pet.dependencia === dependencia || pet.energia === energia || pet.especie === especie || pet.idade === idade || pet.porte === porte
		})

		if (!pet) return null

		return [pet]
	}

}
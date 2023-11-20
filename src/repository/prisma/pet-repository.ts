import { prisma } from '@/database/prisma'
import { FilterRequest, IPet } from '@/interface/IPets'
import { Prisma } from '@prisma/client'

export class PetRepository implements IPet {


	async filterPetsByCharacter(data: FilterRequest) {
		const pet = await prisma.pet.findMany({
			where: {
				OR: [
					{
						idade: data.idade
					},
					{
						porte: data.porte
					},
					{
						energia: data.energia
					},
					{
						dependencia: data.dependencia
					},
					{
						ambiente: data.ambiente
					},
					{
						especie: data.especie
					},
				]
			}
		})

		if (!pet) return null
		return pet
	}

	async findByCity(cidade: string) {
		const pet = await prisma.pet.findMany({
			where: {
				cidade
			}
		})

		if (!pet) return null

		return pet
	}

	async findById(id: string) {
		const pet = await prisma.pet.findUnique({
			where: {
				id
			}
		})

		if (!pet) return null

		return pet
	}

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = await prisma.pet.create({
			data
		})

		return pet
	}

} 
import { InMemoryFotoRepository } from '@/repository/in-memory-database/in-memory-foto-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { CreateFotoService } from './create-foto-service'
import { InMemoryPetRepository } from '@/repository/in-memory-database/in-memory-pet-repository'
import { InMemoryOrgRepository } from '@/repository/in-memory-database/in-memory-org-repository'
import { PetNotExistsWithIdError } from '@/error/pet-not-exists-with-id-error'

let fotoRepository: InMemoryFotoRepository
let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: CreateFotoService

describe('Create Foto Service', () => {
	beforeAll(() => {
		fotoRepository = new InMemoryFotoRepository()
		orgRepository = new InMemoryOrgRepository()
		petRepository = new InMemoryPetRepository()
		sut = new CreateFotoService(fotoRepository, petRepository)
	})

	it('Should be able to register a foto by pet id', async () => {
		const org = await orgRepository.create({
			cep: '69040613',
			email: 'lucas@email.com',
			endereco: 'Cond parque arupuana',
			nome: 'lucas nather',
			senha: '12345678',
			telefone: '92981185790'
		})

		const pet = await petRepository.create({
			ambiente: 'AMPLO',
			cidade: 'Manaus',
			dependencia: 'ALTA',
			energia: 'ALTA',
			especie: 'CACHORRO',
			idade: 'ADULTO',
			nome: 'simba',
			org_id: org.id,
			porte: 'GRANDE',
			sobre: 'lindo',
			requesitos: null
		})

		const { foto } = await sut.execute({
			pet_id: pet.id,
			imagem: 'qualquer imagem'
		})

		expect(foto).toEqual(expect.objectContaining({
			id: expect.any(String)
		}))
	})

	it('Should not be able to register a foto by wrong pet id', async () => {

		expect(async () => {
			await sut.execute({
				pet_id: 'wrong-pet-id',
				imagem: 'qualquer imagem'
			})
		}).rejects.toBeInstanceOf(PetNotExistsWithIdError)
	})
})
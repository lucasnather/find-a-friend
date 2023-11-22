import { InMemoryPetRepository } from '@/repository/in-memory-database/in-memory-pet-repository'
import { InMemoryOrgRepository } from '@/repository/in-memory-database/in-memory-org-repository'
import { FilterManyPetsService } from './filter-many-pets-service'
import { PetWithoutAnyCharactersError } from '@/error/pet-without-any-characters-error'

let petsRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let sut: FilterManyPetsService

describe('Filter Many Pet Service', () => {
	beforeAll(() => {
		petsRepository = new InMemoryPetRepository()
		orgRepository = new InMemoryOrgRepository()
		sut = new FilterManyPetsService(petsRepository)
	})

	it('Should be return a list filter by any characters', async () => {
		const org = await orgRepository.create({
			cep: '69040613',
			email: 'lucas@email.com',
			endereco: 'Cond parque arupuana',
			nome: 'lucas nather',
			senha: '123456',
			telefone: '98118-5790'
		})

		await petsRepository.create({
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

		const petsExists = await sut.execute({
			ambiente: 'AMPLO',
			porte: 'GRANDE'
		})

		expect(petsExists.pet).toEqual([
			expect.objectContaining({
				nome: 'simba',
				sobre: 'lindo'
			})
		])
	})

	it('Should not be return a list filter by any characters', async () => {
		const org = await orgRepository.create({
			cep: '69040613',
			email: 'lucas@email.com',
			endereco: 'Cond parque arupuana',
			nome: 'lucas nather',
			senha: '123456',
			telefone: '98118-5790'
		})

		await petsRepository.create({
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

		expect(async () => {
			await sut.execute({
				ambiente: 'PEQUENO',
				idade: 'FILHOTE'
			})
		}).rejects.toBeInstanceOf(PetWithoutAnyCharactersError)

	})


})
import { InMemoryPetRepository } from '@/repository/in-memory-database/in-memory-pet-repository'
import { beforeAll, it, expect, describe } from 'vitest'
import { InMemoryOrgRepository } from '@/repository/in-memory-database/in-memory-org-repository'
import { SearchManyPetsService } from './search-many-pets-service'
import { CidadeNaoExistePetCadastradoError } from '@/error/cidade-nao-existe-cadstrada-error'

let petsRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let sut: SearchManyPetsService

describe('Search Many Pet Service', () => {
	beforeAll(() => {
		petsRepository = new InMemoryPetRepository()
		orgRepository = new InMemoryOrgRepository()
		sut = new SearchManyPetsService(petsRepository)
	})


	it('should be return a many pets by city', async () => {
		const org = await orgRepository.create({
			cep: '69040613',
			email: 'lucas@email.com',
			endereco: 'Cond parque arupuana',
			nome: 'lucas nather',
			senha: '123456',
			telefone: '98118-5790'
		})

		const pet = await petsRepository.create({
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
			cidade: pet.cidade
		})

		expect(petsExists.pet).toEqual([
			expect.objectContaining({
				nome: 'simba',
				sobre: 'lindo'
			})
		])
	})

	it('should not be return a many pets by city', async () => {
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
				cidade: 'not exists city'
			})
		}).rejects.toBeInstanceOf(CidadeNaoExistePetCadastradoError)

	})
})
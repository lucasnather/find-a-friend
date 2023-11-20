import { InMemoryPetRepository } from '@/repository/in-memory-database/in-memory-pet-repository'
import { beforeAll, it, expect, describe } from 'vitest'
import { FindUniquePetsService } from './find-unique-pet-service'
import { InMemoryOrgRepository } from '@/repository/in-memory-database/in-memory-org-repository'
import { RecursoNaoEncontradoError } from '@/error/recurso-nao-encontrado-error'

let petsRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let sut: FindUniquePetsService

describe('Find Unique Pet Service', () => {
	beforeAll(() => {
		petsRepository = new InMemoryPetRepository()
		orgRepository = new InMemoryOrgRepository()
		sut = new FindUniquePetsService(petsRepository)
	})

	it('Should be return a unique pet register by id', async () => {
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
			id: pet.id
		})

		expect(petsExists.pet).toEqual(expect.objectContaining({
			nome: 'simba',
			sobre: 'lindo'
		}))
	})

	it('Should be not return a unique pet register by id', async () => {
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
				id: 'not exists id'
			})
		}).rejects.toBeInstanceOf(RecursoNaoEncontradoError)

	})
})
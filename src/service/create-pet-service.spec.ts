import { InMemoryPetRepository } from '@/repository/in-memory-database/in-memory-pet-repository'
import { CreatePetService } from './create-pet-service'
import { InMemoryOrgRepository } from '@/repository/in-memory-database/in-memory-org-repository'
import { OrgNotExistsError } from '@/error/org-not-exists-error'

let petsRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let sut: CreatePetService

describe('Create Pet Service', () => {
	beforeAll(() => {
		petsRepository = new InMemoryPetRepository()
		orgRepository = new InMemoryOrgRepository()
		sut = new CreatePetService(petsRepository, orgRepository)
	})

	it('should be create a pet', async () => {
		const org = await orgRepository.create({
			cep: '69040613',
			email: 'lucas@email.com',
			endereco: 'Cond parque arupuana',
			nome: 'lucas nather',
			senha: '12345678',
			telefone: '92981185790'
		})

		const { pet } = await sut.execute({
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

		expect(pet).toEqual(expect.objectContaining({
			id: expect.any(String),
			createdAt: expect.any(Date)
		}))
	})

	it('should not be create a pet with wrong orgId', async () => {
		await orgRepository.create({
			cep: '69040613',
			email: 'lucas@email.com',
			endereco: 'Cond parque arupuana',
			nome: 'lucas nather',
			senha: '12345678',
			telefone: '92981185790'
		})

		expect(async () =>
			await sut.execute({
				ambiente: 'AMPLO',
				cidade: 'Manaus',
				dependencia: 'ALTA',
				energia: 'ALTA',
				especie: 'CACHORRO',
				idade: 'ADULTO',
				nome: 'simba',
				org_id: 'wrong org id',
				porte: 'GRANDE',
				sobre: 'lindo',
				requesitos: null
			})
		).rejects.toBeInstanceOf(OrgNotExistsError)
	})
})
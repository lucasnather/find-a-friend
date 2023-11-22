import { InMemoryOrgRepository } from '@/repository/in-memory-database/in-memory-org-repository'
import { CreateOrgService } from './create-org-service'
import { OrgAlreadyExistsError } from '@/error/org-already-exists-error'


let orgRepository: InMemoryOrgRepository
let sut: CreateOrgService

describe('Create org', () => {
	beforeAll(() => {
		orgRepository = new InMemoryOrgRepository()
		sut = new CreateOrgService(orgRepository)
	})

	it('should be able to register a org', async () => {

		const { org } = await sut.execute({
			cep: '69040613',
			email: 'lucas@email.com',
			endereco: 'Cond parque arupuana',
			nome: 'lucas nather',
			senha: '123456',
			telefone: '98118-5790'
		})

		expect(org).toEqual(expect.objectContaining({
			id: expect.any(String)
		}))
	})

	it('should not be able to register a duplicate org with same name', async () => {
		await sut.execute({
			cep: '69040613',
			email: 'bia2@email.com',
			endereco: 'Cond parque arupuana',
			nome: 'bia nather',
			senha: '123456',
			telefone: '98118-5790'
		})

		expect(async () => {
			await sut.execute({
				cep: '69040613',
				email: 'bia@email.com',
				endereco: 'Cond parque arupuana',
				nome: 'bia nather',
				senha: '123456',
				telefone: '98118-5790'
			})
		}).rejects.toBeInstanceOf(OrgAlreadyExistsError)
	})

	it('should not be able to register a duplicate org with same email', async () => {
		await sut.execute({
			cep: '69040613',
			email: 'bia@email.com',
			endereco: 'Cond parque arupuana',
			nome: 'biaaaaa nather',
			senha: '123456',
			telefone: '98118-5790'
		})

		expect(async () => {
			await sut.execute({
				cep: '69040613',
				email: 'bia@email.com',
				endereco: 'Cond parque arupuana',
				nome: 'bia nather',
				senha: '123456',
				telefone: '98118-5790'
			})
		}).rejects.toBeInstanceOf(OrgAlreadyExistsError)
	})
})
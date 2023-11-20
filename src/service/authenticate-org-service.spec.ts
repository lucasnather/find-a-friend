import { InMemoryOrgRepository } from '@/repository/in-memory-database/in-memory-org-repository'
import { beforeAll, expect, it, describe } from 'vitest'
import { AuthenticateOrgService } from './authenticate-org-service'
import { InvalidCredentialsError } from '@/error/invalid-credentials-error'

let orgRepository: InMemoryOrgRepository
let sut: AuthenticateOrgService

describe('Authenticate Service', () => {
	beforeAll(() => {
		orgRepository = new InMemoryOrgRepository()
		sut = new AuthenticateOrgService(orgRepository)
	})

	it('should be authenticate user', async () => {
		const org = await orgRepository.create({
			cep: '69040612',
			email: 'sim@email.com',
			endereco: 'cond',
			nome: 'sim',
			senha: '12345678',
			telefone: '92981185790',
		})

		const orgAuthenticate = await sut.execute({
			email: org.email,
			senha: '12345678'
		})

		expect(orgAuthenticate.org).toEqual(expect.objectContaining({
			id: expect.any(String),
			email: org.email
		}))
	})

	it('should not be authenticate user with wrong password', async () => {
		const org = await orgRepository.create({
			cep: '69040612',
			email: 'sim@email.com',
			endereco: 'cond',
			nome: 'sim',
			senha: '12345678',
			telefone: '92981185790',
		})

		expect(async () => {
			await sut.execute({
				email: org.email,
				senha: 'wrong-password'
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)

	})

	it('should not be authenticate user with wrong email', async () => {
		await orgRepository.create({
			cep: '69040612',
			email: 'sim@email.com',
			endereco: 'cond',
			nome: 'sim',
			senha: '12345678',
			telefone: '92981185790',
		})

		expect(async () => {
			await sut.execute({
				email: 'worng-email',
				senha: '12345678'
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)

	})
})
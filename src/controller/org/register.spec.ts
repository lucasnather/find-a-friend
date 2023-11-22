import request from 'supertest'
import { app } from '@/app'

describe('Register Org', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to register a org', async () => {
		await request(app.server)
			.post('/org')
			.send({
				nome: 'org',
				email: 'org@email.com',
				cep: '69040613',
				endereco: 'cond',
				telefone: '99981185790',
				senha: '12345678'

			}).expect(201)
	})

	it('should not be able to register a org with invalid labels', async () => {
		await request(app.server)
			.post('/org')
			.send({
				nome: 'new',
				email: 'new@email.com',
				cep: 'invalid',
				endereco: 'cond',
				telefone: '99981185790',
				senha: '12345678'

			})
	})
})
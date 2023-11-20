import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it } from 'vitest'

describe('Authenticate ', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be authenticate user', async () => {
		await request(app.server)
			.post('/org')
			.send({
				nome: 'org',
				email: 'org@email.com',
				cep: '69040613',
				endereco: 'cond',
				telefone: '99981185790',
				senha: '12345678'
			})

		await request(app.server)
			.post('/org/login')
			.send({
				email: 'org@email.com',
				senha: '12345678'
			}).expect(200)
	})

	it('should not be authenticate user', async () => {
		await request(app.server)
			.post('/org')
			.send({
				nome: 'org',
				email: 'org@email.com',
				cep: '69040613',
				endereco: 'cond',
				telefone: '99981185790',
				senha: '12345678'
			})

		await request(app.server)
			.post('/org/login')
			.send({
				email: 'org@email.com',
				senha: 'wrong-password'
			}).expect(404)
	})
})
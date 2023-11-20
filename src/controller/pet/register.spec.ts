import { app } from '@/app'
import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'

describe('Register Pet', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to register a pet', async () => {
		const org = await request(app.server)
			.post('/org')
			.send({
				nome: 'org',
				email: 'org@email.com',
				cep: '69040613',
				endereco: 'cond',
				telefone: '99981185790',
				senha: '12345678'
			})

		const authenticate = await request(app.server)
			.post('/org/login')
			.send({
				email: 'org@email.com',
				senha: '12345678'
			})

		const { token } = authenticate.body

		await request(app.server)
			.post('/pet')
			.set('Authorization', `Bearer ${token}`)
			.send({
				nome: 'Leia',
				cidade: 'Manaus',
				sobre: 'cachorrinha linda e maluca',
				idade: 'JOVEM',
				porte: 'PEQUENINO',
				energia: 'MEDIA',
				dependencia: 'MEDIA',
				ambiente: 'MEDIO',
				especie: 'CACHORRO',
				org_id: org.body.org.id,
				requesitos: null,
			}).expect(201)
	})

	it('should not be able to register a pet', async () => {

		await request(app.server)
			.post('/pet')
			.send({
				nome: 'Leia',
				cidade: 'Manaus',
				sobre: 'cachorrinha linda e maluca',
				idade: 'JOVEM',
				porte: 'PEQUENINO',
				energia: 'MEDIA',
				dependencia: 'MEDIA',
				ambiente: 'MEDIO',
				especie: 'CACHORRO',
				org_id: 'wrong id',
				requesitos: null,
			}).expect(404)
	})
})
import { app } from '@/app'
import request from 'supertest'

describe('Read by city Pet', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be return a pet by city', async () => {
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

		const pet = await request(app.server)
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
			})

		await request(app.server)
			.get(`/pet/${pet.body.pet.cidade}`)
			.expect(200)
	})

	it('should not be return a pet by city', async () => {
		await request(app.server)
			.get('/pet/non-exist-city')
			.expect(404)
	})
})
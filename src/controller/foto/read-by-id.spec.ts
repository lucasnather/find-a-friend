import { app } from '@/app'
import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import path from 'node:path'

const filePath = path.resolve(__dirname, '../../../tmp/upload', '4baecc6983d4ffe910b50a4d034831f6-WhatsApp Image 2023-11-16 at 16.35.56.jpeg')

describe('Read by id Foto', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be find a photo by pet id', async () => {
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
			}).expect(200)

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
			.post('/upload')
			.set('Authorization', `Bearer ${token}`)
			.field('petId', pet.body.pet.id)
			.attach('imagem', filePath)

		await request(app.server)
			.get(`/upload/${pet.body.pet.id}`)
			.expect(200)
	})

	it('should not be find a photo with wrong petid', async () => {

		await request(app.server)
			.get('/upload/non-exist-petId')
			.expect(404)
	})
}) 
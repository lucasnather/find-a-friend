import { app } from '@/app'
import request from 'supertest'
import path from 'node:path'

const filePath = path.resolve(__dirname, '../../../tmp/upload', '64038bef361ff3ad91020e562183f44b-WhatsApp Image 2023-11-16 at 16.35.56.jpeg')

describe('Register Foto', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be resgiter a photo', async () => {
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
			.expect(201)
	})

	it('should not be resgiter a photo with wrong petid', async () => {

		await request(app.server)
			.post('/upload')
			.field('petId', 'wrong-pet-id')
			.attach('imagem', filePath)
			.expect(404)
	})
}) 
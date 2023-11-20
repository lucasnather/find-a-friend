import { filterByCharacter } from '@/controller/pet/filter-by-characters'
import { readByCity } from '@/controller/pet/read-by-city'
import { readById } from '@/controller/pet/read-by-id'
import { register } from '@/controller/pet/register'
import { jwtVerifyToken } from '@/middlewares/jwt-verify-token'
import { FastifyInstance } from 'fastify'


export async function petsRoutes(app: FastifyInstance) {

	app.post('/', { onRequest: [jwtVerifyToken] }, register)
	app.get('/:cidade', readByCity)
	app.get('/detalhes/:id', readById)
	app.get('/', filterByCharacter)
}
import { readById } from '@/controller/photo/read-by-id'
import { register } from '@/controller/photo/register'
import { jwtVerifyToken } from '@/middlewares/jwt-verify-token'
import { upload } from '@/multer/upload'
import { FastifyInstance } from 'fastify'

export async function photosRoutes(app: FastifyInstance) {

	app.post('/', { preHandler: upload.single('imagem'), onRequest: [jwtVerifyToken] }, register)
	app.get('/:petId', readById)
}
import { readById } from '@/controller/foto/read-by-id'
import { register } from '@/controller/foto/register'
import { jwtVerifyToken } from '@/middlewares/jwt-verify-token'
import { upload } from '@/multer/upload'
import { FastifyInstance } from 'fastify'

export async function fotosRoutes(app: FastifyInstance) {

	app.post('/', { preHandler: upload.single('imagem'), onRequest: [jwtVerifyToken] }, register)
	app.get('/:petId', readById)
}
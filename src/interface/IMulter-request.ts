import { FastifyRequest } from 'fastify'

export interface MulterRequest extends FastifyRequest {
	file?: Express.Multer.File;
}
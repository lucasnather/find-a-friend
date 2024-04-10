import { FastifyInstance } from 'fastify'
import { MulterError } from 'fastify-multer'
import { ZodError } from 'zod'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler:  FastifyErrorHandler = async (error, request, reply) => {
    if(error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation Error',
            errors: error.flatten().fieldErrors
        })
    }
    
    if( error instanceof MulterError) {
        
        return reply.status(400).send({
            message: error.message,
            errors: error.name
        })
    }

    return reply.status(500).send({
        message: 'Server Internal Error'
    })
}
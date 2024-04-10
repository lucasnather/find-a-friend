import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createPhoto } from "../../factory/photos/create-photo";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { upload } from "../../multer/multer";

export async function registerPhoto(app: FastifyInstance) {

    const getFileSchema = z.object({
        originalname: z.string()
    })

    const getParamsSchema = z.object({
        petsId: z.coerce.number().int().positive()
    })

    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/pets/photos/:petsId', {
            schema: {
                summary: 'Create a Photo',
                tags: ['photos'],
                security: [
                    {
                        "bearerAuth": []
                    }
                ],
                produces: ['multipart/form-data'],
                consumes: ['multipart/form-data'],
            },
            preHandler: upload.single('images')
        }, async (request, reply) => {
            await request.jwtVerify()

            const { petsId } = getParamsSchema.parse(request.params)
            const { originalname: name } = getFileSchema.parse(request.file)
            console.log(request.file)

            const createPhotoService = createPhoto()

            const { photos } = await createPhotoService.handle({
                petsId,
                photo: name
            })

            return reply.status(201).send({
                photos
            })
        })
}
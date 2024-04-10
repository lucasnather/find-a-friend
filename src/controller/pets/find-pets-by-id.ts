import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { findPetById } from "../../factory/pets/find-pet-by-id";

export async function findPetsById(app: FastifyInstance) {

    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/pets/:petsId', {
            schema: {
                summary: 'Get a Pet by Id',
                tags: ['pets'],
                params: z.object({
                    petsId: z.coerce.number().int().positive()
                })
            }
        }, async (request, reply) => {
            const { petsId } = request.params

            const findPetByIdService = findPetById()

            const { pet } = await findPetByIdService.handle({
                id: petsId
            })

            return reply.send({
                pet
            })
        })
}
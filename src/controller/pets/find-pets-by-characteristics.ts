import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { findPetByCharacteristics } from "../../factory/pets/find-pet-by-characteristics";

export async function findPetsByCharacteristics(app: FastifyInstance) {

    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/pets', {
            schema: {
                summary: 'Find By Characteristic',
                tags: ['pets'],
                querystring: z.object({
                    city: z.string(),
                    age: z.coerce.number().optional(),
                    size: z.string().optional(),
                    energy: z.string().optional(),
                    independence: z.string().optional(),
                    ambience: z.string().optional(),
                })
            }
        }, async (request, reply) => {
            const { city, age, ambience, energy, independence, size} = request.query

            const findPetByCharacteristicsService = findPetByCharacteristics()

            const { pet } = await findPetByCharacteristicsService.handle({
                city,
                age,
                ambience,
                energy,
                independence,
                size
            })
            
            return reply.send({
                pet
            })
        })
}
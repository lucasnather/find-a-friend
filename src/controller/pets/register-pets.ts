import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { createPet } from "../../factory/pets/create-pet";

export async function registerPets(app: FastifyInstance){

    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/pets', {
            schema: {
                summary: 'Create a Pets',
                tags: ['pets'],
                security: [
                    {
                        "bearerAuth": []
                    }
                ],
                body: z.object({
                    about: z.string(),
                    age: z.number(),
                    ambience: z.string(),
                    energy: z.string(),
                    independence: z.string(),
                    name: z.string(),
                    size: z.string(),
                    requirements: z.array(z.string())
                }),
                response: {
                    201: z.object({
                        id: z.number().int().positive(),
                        orgsId: z.string().uuid(),
                        about: z.string(),
                        age: z.number(),
                        ambience: z.string(),
                        energy: z.string(),
                        independence: z.string(),
                        name: z.string(),
                        size: z.string(),
                        requirements: z.array(z.string())
                    }),
                },
            },
        }, async (request, reply) => {
            await request.jwtVerify()

            const {
                about,
                age,
                ambience,
                energy,
                independence,
                name,
                size,
                requirements
            } = request.body

            const { sub } = request.user

            const createPetsService = createPet()

            const { pet } = await createPetsService.handle({
                about,
                age,
                ambience,
                energy,
                independence,
                name,
                size,
                orgsId: sub
            }, requirements)

            reply.status(201).send({
                id: pet.id,
                orgsId: pet.orgsId,
                about: pet.about,
                age: pet.age,
                ambience: pet.energy,
                energy: pet.about,
                independence: pet.independence,
                name: pet.name,
                size: pet.size,
                requirements
            })
        })
}
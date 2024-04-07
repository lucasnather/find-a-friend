import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { loginOrg } from "../../factory/orgs/authenticate-org";

export async function authenticateOrg(app: FastifyInstance) {

    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/orgs/login', {
            schema: {
                summary: 'Authenticate an Org',
                tags: ['orgs'],
                
                body: z.object({
                    email: z.string().email(),
                    password: z.string()
                }),
                response: {
                    201: z.object({
                        token: z.string()
                    })
                }
            }
        }, async (request, reply) => {
            const { email, password } = request.body

            const authenticateOrgService = loginOrg()
            
            const { org } = await authenticateOrgService.handle({
                email,
                password
            })

            const token = await reply.jwtSign({
                sub: org.id,
            }, { expiresIn: '1d' })

            return reply.status(201).send({
                token
            })
        })
}
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { PasswordHash } from "../../utils/password-hash";
import { CreateOrg } from "../../factory/orgs/create-org";
import { ViaCep } from "../../api/viacep";


export async function registerOrg(app: FastifyInstance) {

    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/orgs', {
            schema: {
                summary: 'Create an Org',
                tags: ['orgs'],
                body: z.object({
                    charge: z.string(),
                    email: z.string().email(),
                    cep: z.string().length(9, { message: 'Cep has to contain 9 characteres'}),
                    address: z.string(),
                    whatsapp: z.string().length(12, { message:'WhatsApp has to contain 12 characteres with DDD' }),
                    password: z.string().min(8, { message: 'Password Length Minimum 8 characters'})
                }),
                response: {
                    201: z.object({
                        id: z.string().uuid(),
                        charge: z.string(),
                        email: z.string(),
                        cep: z.string(),
                        city: z.string(),
                        uf: z.string(),
                        address: z.string(),
                        whatsapp: z.string(),
                        password: z.string(),
                        createdAt: z.date()
                    })
                }
            }
        }, async (request, reply) => {
            const { address, cep, charge, email, password, whatsapp  } = request.body

            const passwordHash = new PasswordHash()
            const hashPassword = await passwordHash.hashPassword(password)

            const viaCep = new ViaCep(cep)
            const { localidade, uf } = await viaCep.consumeApiViaCep()

            const createOrgService = CreateOrg()

            const { org } = await createOrgService.handle({
                address,
                cep,
                city: localidade,
                uf: uf,
                charge,
                email,
                password: hashPassword,
                whatsapp
            })

            return reply.status(201).send({
                id: org.id,
                charge: org.address,
                email: org.email,
                cep: org.cep,
                city: org.city || '',
                uf: org.uf || '',
                address: org.address,
                whatsapp: org.whatsapp,
                password: org.password,
                createdAt: org.createdAt
            })
        })

}
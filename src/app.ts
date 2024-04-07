import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { registerOrg } from "./controller/orgs/register-org";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler,  } from 'fastify-type-provider-zod'
import { errorHandler } from "./error-handler";
import { env } from "./env/env";
import { authenticateOrg } from "./controller/orgs/authenticate-org";


export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    
})

app.register(fastifySwagger, {
    swagger: {
        produces: ['application/json', 'multipart/form-data'],
        consumes: ['application/json', 'multipart/form-data'],
        info: {
            title: 'Find A Friend',
            description: 'An API to adopt Pets',
            version: '1.0'
        }
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUI, {
    prefix: '/docs'
})


app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler)

app.register(registerOrg)
app.register(authenticateOrg)
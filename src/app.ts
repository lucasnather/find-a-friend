import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { registerOrg } from "./controller/orgs/register-org";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler,  } from 'fastify-type-provider-zod'
import { errorHandler } from "./error-handler";


export const app = fastify()

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
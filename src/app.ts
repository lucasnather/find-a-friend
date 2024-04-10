import fastify from "fastify";
import fastifyMulter from "fastify-multer";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { registerOrg } from "./controller/orgs/register-org";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler,  } from 'fastify-type-provider-zod'
import { errorHandler } from "./error-handler";
import { env } from "./env/env";
import { authenticateOrg } from "./controller/orgs/authenticate-org";
import { registerPets } from "./controller/pets/register-pets";
import { registerPhoto } from "./controller/photos/register-photo";
import { findPetsById } from "./controller/pets/find-pets-by-id";
import { findPetsByCharacteristics } from "./controller/pets/find-pets-by-characteristics";


export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    
})

app.register(fastifySwagger, {
    openapi: {
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    swagger: {
        produces: ['application/json', 'multipart/form-data'],
        consumes: ['application/json', 'multipart/form-data'],
        info: {
            title: 'Find A Friend',
            description: 'An API to adopt Pets',
            version: '1.0',
        }
    },

    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
    prefix: '/docs',
    
})

app.register(fastifyMulter.contentParser)


app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler)

app.register(registerOrg)
app.register(authenticateOrg)
app.register(registerPets)
app.register(registerPhoto)
app.register(findPetsById)
app.register(findPetsByCharacteristics)
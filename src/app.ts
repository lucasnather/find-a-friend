import fastify from "fastify";
import { registerOrg } from "./controller/orgs/register-org";
import { serializerCompiler, validatorCompiler,  } from 'fastify-type-provider-zod'
import { errorHandler } from "./error-handler";


export const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler)

app.register(registerOrg)
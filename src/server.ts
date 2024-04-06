import { app } from "./app";
import { env } from "./env/env";

app.listen({
    port: env.PORT
})
.then(() => {
    console.log(`Server running at Port ${env.PORT}`)
})
.catch((e) => {
    console.error('Server Error ', e)
})
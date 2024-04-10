import { fastify } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    file: {
      originalName: string;
    };
    params: {
        petsId: string
    }
  }
}

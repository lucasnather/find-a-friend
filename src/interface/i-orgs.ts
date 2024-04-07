import { Orgs, Prisma } from "@prisma/client";

export interface IOrgs {
    create(data: Prisma.OrgsCreateInput): Promise<Orgs>
    findByCepAndEmail(cep: string, email: string): Promise<Orgs | null>
    findByEmail(email: string): Promise<Orgs | null>
}
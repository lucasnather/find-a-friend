import { Org, Prisma } from '@prisma/client'

export interface IOrg {
	findByNameOrEmail(nome: string, email: string): Promise<Org | null>
	create(data: Prisma.OrgCreateInput): Promise<Org>
	findByEmail(email: string): Promise<Org | null>
	findById(id: string): Promise<Org | null>
}
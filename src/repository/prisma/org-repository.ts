import { prisma } from '@/database/prisma'
import { IOrg } from '@/interface/IOrg'
import { Prisma } from '@prisma/client'

export class OrgRepository implements IOrg {
	async findByEmail(email: string) {
		const org = await prisma.org.findUnique({
			where: {
				email
			}
		})

		if (org === null) return null

		return org
	}

	async findById(id: string) {
		const org = await prisma.org.findUnique({
			where: {
				id
			}
		})

		if (org === null) return null

		return org
	}

	async findByNameOrEmail(nome: string, email: string) {
		const org = await prisma.org.findFirst({
			where: {
				OR: [
					{
						nome
					},
					{
						email
					}
				]
			}
		})

		console.log(org)

		if (org === null) return null

		return org
	}

	async create(data: Prisma.OrgCreateInput) {
		const org = await prisma.org.create({
			data
		})

		return org
	}

}
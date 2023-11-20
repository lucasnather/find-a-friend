import { IOrg } from '@/interface/IOrg'
import { Org, Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgRepository implements IOrg {

	public org: Org[] = []

	async findByEmail(email: string) {
		const org = this.org.find(o => o.email === email)

		if (!org) return null

		return org
	}

	async findById(id: string) {
		const org = this.org.find(o => o.id === id)

		if (!org) return null

		return org
	}

	async findByNameOrEmail(nome: string, email: string) {
		const org = this.org.find(o => {
			return o.nome === nome || o.email === email
		})

		if (!org) return null

		return org
	}

	async create(data: Prisma.OrgCreateInput) {
		const org: Org = {
			id: randomUUID(),
			cep: data.cep,
			email: data.email,
			endereco: data.endereco,
			nome: data.nome,
			senha: await hash(data.senha, 8),
			telefone: data.telefone,
			createdAt: new Date()
		}

		this.org.push(org)

		return org
	}

}
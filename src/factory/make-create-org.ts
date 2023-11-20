import { CreateOrgService } from './../service/create-org-service'
import { OrgRepository } from '@/repository/prisma/org-repository'

export function makeCreateOrg() {
	const orgRepository = new OrgRepository()
	const createOrgService = new CreateOrgService(orgRepository)

	return createOrgService
}
import { AuthenticateOrgService } from '@/service/authenticate-org-service'
import { OrgRepository } from '@/repository/prisma/org-repository'

export function makeAuthenticateOrg() {
	const orgRepository = new OrgRepository()
	const authenticateOrgService = new AuthenticateOrgService(orgRepository)

	return authenticateOrgService
}
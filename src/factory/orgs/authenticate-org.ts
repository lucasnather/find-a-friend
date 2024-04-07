import { OrgsRepository } from "../../repository/orgs-repository";
import { AuthenticateOrgService } from "../../service/orgs/authenticate-org-service";

export function loginOrg() {
    const orgsRepository = new OrgsRepository()
    const authenticateOrgService = new AuthenticateOrgService(orgsRepository)

    return authenticateOrgService
}
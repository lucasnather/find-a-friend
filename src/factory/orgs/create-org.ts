import { OrgsRepository } from "../../repository/orgs-repository";
import { CreateOrgService } from "../../service/orgs/create-org-service";

export function CreateOrg() {
    const orgsRepository = new OrgsRepository()
    const createOrgService = new CreateOrgService(orgsRepository)

    return createOrgService
}
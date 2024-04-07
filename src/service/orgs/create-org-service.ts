import { Orgs } from "@prisma/client";
import { IOrgs } from "../../interface/i-orgs";

interface CreateOrgRequest {
    charge: string
    email: string
    cep: string
    address: string
    whatsapp: string
    password: string
}

interface CreateOrgResponse {
    org: Orgs
}

export class CreateOrgService {

    constructor(
        private orgsRepository: IOrgs
    ) {}

    async handle(data: CreateOrgRequest): Promise<CreateOrgResponse> {
        const doesOrgExist = await this.orgsRepository.findByCepAndEmail(data.cep, data.email)

        if(doesOrgExist) throw new Error("Org Already Exist")

        const org = await this.orgsRepository.create(data)

        return {
            org
        }
    }
}
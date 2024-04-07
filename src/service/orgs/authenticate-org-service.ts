import { Orgs } from "@prisma/client";
import { IOrgs } from "../../interface/i-orgs";
import { PasswordHash } from "../../utils/password-hash";

interface AuthenticateOrgRequest {
    email: string
    password: string
}

interface AuthenticateOrgResponse {
    org: Orgs
}

export class AuthenticateOrgService {

    constructor(
        private orgsRepository: IOrgs
    ) {}

    async handle({ email, password }: AuthenticateOrgRequest): Promise<AuthenticateOrgResponse> {
        const org = await this.orgsRepository.findByEmail(email)

        if(!org) throw new Error('Invalid Credentials')

        const passwordHash = new PasswordHash()

        const doesPasswordExist = await passwordHash.comparePassword(password, org.password)

        if(!doesPasswordExist) throw new Error('Invalid Credentials')

        return {
            org
        }
    }
}
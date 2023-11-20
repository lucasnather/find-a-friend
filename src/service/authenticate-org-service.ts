import { InvalidCredentialsError } from '@/error/invalid-credentials-error'
import { IOrg } from '@/interface/IOrg'
import { PassowordHash } from '@/utils/password-hash'
import { Org } from '@prisma/client'

interface AuthenticateOrgServiceRequest {
	email: string,
	senha: string
}

interface AuthenticateOrgServiceResponse {
	org: Org
}

export class AuthenticateOrgService {
	constructor(private orgRepository: IOrg) { }

	async execute(data: AuthenticateOrgServiceRequest): Promise<AuthenticateOrgServiceResponse> {
		const org = await this.orgRepository.findByEmail(data.email)

		if (org === null) throw new InvalidCredentialsError()

		const passwordHash = new PassowordHash()
		const doesPasswordExists = await passwordHash.compareMyPassword(data.senha, org.senha)

		if (!doesPasswordExists) throw new InvalidCredentialsError()

		return {
			org
		}
	}
}
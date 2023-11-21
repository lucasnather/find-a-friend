import { compare, hash } from 'bcryptjs'

export class PasswordHash {

	async hashPassword(password: string) {
		const saltRound = 8
		const hashPassword = await hash(password, saltRound)
		return hashPassword
	}

	async compareMyPassword(password: string, passwordDb: string) {

		const isHashed = await compare(password, passwordDb)

		return isHashed
	}
}
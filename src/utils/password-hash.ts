import { compare, hash } from 'bcryptjs'

export class PassowordHash {
	async hashMyPassword(password: string) {
		const saltRound = 8
		const passwordHash = await hash(password, saltRound)
		return passwordHash

	}

	async compareMyPassword(password: string, passwordDb: string) {
		const compareHash = await compare(password, passwordDb)
		try {
			return compareHash
		} catch (e) {
			console.error('Algum erro')
		}
	}
}
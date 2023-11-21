import { beforeAll, describe, expect, it } from 'vitest'
import { PasswordHash } from './password-hash'

let passwordHash: PasswordHash

describe('Password Hash', () => {
	beforeAll(() => {
		passwordHash = new PasswordHash()
	})

	it('should be able to hash a password', async () => {
		const hashPassword = await passwordHash.hashPassword('12345678')

		expect(hashPassword).toBeTruthy()
	})

	it('should be able to compare a password hashed with normal', async () => {
		const hashPassword = await passwordHash.hashPassword('12345678')

		const isHashed = await passwordHash.compareMyPassword('12345678', hashPassword)

		expect(isHashed).toBeTruthy()
	})
})
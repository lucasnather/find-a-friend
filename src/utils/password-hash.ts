import { compare, hash } from "bcryptjs"

export class PasswordHash {

    async hashPassword(password: string) {
        const saltRounds = 8
        return await hash(password, saltRounds)
    }

    async comparePassword(password: string, dbPassword: string) {
        return await compare(password, dbPassword)
    }

}
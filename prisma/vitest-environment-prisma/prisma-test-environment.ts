import { prisma } from '@/database/prisma'
import 'dotenv/config'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import type { Environment } from 'vitest'


const generateDatabaseUrl = (schema: string) => {


	if (!process.env.DATABASE_URL) throw new Error('Database não existe')

	const databaseUrl = new URL(process.env.DATABASE_URL)

	databaseUrl.searchParams.set('schema', schema)

	return databaseUrl.toString()
}

export default <Environment>{
	name: 'prisma',
	transformMode: 'ssr',
	async setup() {
		const schema = randomUUID()
		const newDatabaseUrl = generateDatabaseUrl(schema)

		process.env.DATABASE_URL = newDatabaseUrl
		execSync('npx prisma migrate deploy')

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)

				await prisma.$disconnect()
			}
		}

	}
}
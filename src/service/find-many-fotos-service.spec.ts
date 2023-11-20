import { InMemoryPetRepository } from '@/repository/in-memory-database/in-memory-pet-repository'
import { beforeAll, it, expect, describe } from 'vitest'
import { InMemoryOrgRepository } from '@/repository/in-memory-database/in-memory-org-repository'
import { FindManyFotosService } from './find-many-fotos-service'
import { InMemoryFotoRepository } from '@/repository/in-memory-database/in-memory-foto-repository'
import { FotoNaoEncotradaError } from '@/error/foto-nao-encontrada-error'

let fotosRepository: InMemoryFotoRepository
let petRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let sut: FindManyFotosService

describe('Find Many Fotos Pet Service', () => {
	beforeAll(() => {
		fotosRepository = new InMemoryFotoRepository()
		petRepository = new InMemoryPetRepository()
		orgRepository = new InMemoryOrgRepository()
		sut = new FindManyFotosService(fotosRepository)
	})

	it('should be able to find a foto by pet id', async () => {
		const org = await orgRepository.create({
			cep: '69040613',
			email: 'lucas@email.com',
			endereco: 'Cond parque arupuana',
			nome: 'lucas nather',
			senha: '12345678',
			telefone: '92981185790'
		})

		const pet = await petRepository.create({
			ambiente: 'AMPLO',
			cidade: 'Manaus',
			dependencia: 'ALTA',
			energia: 'ALTA',
			especie: 'CACHORRO',
			idade: 'ADULTO',
			nome: 'simba',
			org_id: org.id,
			porte: 'GRANDE',
			sobre: 'lindo',
			requesitos: null
		})

		const foto = await fotosRepository.create({
			pet_id: pet.id,
			imagem: 'qualquer imagem'
		})

		const findFoto = await sut.execute({
			petId: pet.id
		})

		expect(findFoto.foto).toEqual([expect.objectContaining({
			id: expect.any(String),
			imagem: foto.imagem
		})])
		expect(findFoto.foto).toHaveLength(1)
	})

	it('should be able to find a foto by pet id', async () => {
		const org = await orgRepository.create({
			cep: '69040613',
			email: 'lucas@email.com',
			endereco: 'Cond parque arupuana',
			nome: 'lucas nather',
			senha: '12345678',
			telefone: '92981185790'
		})

		const pet = await petRepository.create({
			ambiente: 'AMPLO',
			cidade: 'Manaus',
			dependencia: 'ALTA',
			energia: 'ALTA',
			especie: 'CACHORRO',
			idade: 'ADULTO',
			nome: 'simba',
			org_id: org.id,
			porte: 'GRANDE',
			sobre: 'lindo',
			requesitos: null
		})

		await fotosRepository.create({
			pet_id: pet.id,
			imagem: 'qualquer imagem'
		})

		expect(async () => {
			await sut.execute({
				petId: 'outro-pet-id'
			})
		}).rejects.toBeInstanceOf(FotoNaoEncotradaError)
	})
})
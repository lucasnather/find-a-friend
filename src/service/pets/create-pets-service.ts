import { Pets } from "@prisma/client";
import { IPets } from "../../interface/i-pets";

interface CreatePetsRequest {
    about: string
    age: number
    ambience: string
    energy: string
    independence: string
    name: string
    size: string
    orgsId: string
}

interface CreatePetsResponse {
    pet: Pets
}

export class CreatePetsService {

    constructor(
        private petsRepository: IPets
    ) {}

    async handle(data: CreatePetsRequest,requirements: string[]): Promise<CreatePetsResponse> {
        const pet = await this.petsRepository.create(
            data, requirements
        )

        return {
            pet
        }
    }
}
import { Pets } from "@prisma/client";
import { IPets } from "../../interface/i-pets";

interface FindPetByCharacteristicsRequest {
    city: string
    age?: number
    size?: string
    energy?: string
    independence?: string
    ambience?: string
}

interface FindPetByCharacteristicsResponse {
    pet: Pets[]
}

export class FindPetByCharacteristicsService {

    constructor(
        private petsRepository: IPets
    ) {}

    async handle(data: FindPetByCharacteristicsRequest): Promise<FindPetByCharacteristicsResponse> {
        const pet = await this.petsRepository.findByCharacteristic(data)

        if(!pet) throw new Error('Pets not exists')

        return {
            pet
        }
    }
}
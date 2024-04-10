import { Pets } from "@prisma/client";
import { IPets } from "../../interface/i-pets";

interface FindPetByIdRequest {
    id: number
}

interface FindPetByIdResponse {
    pet: Pets
}

export class FindPetByIdService {

    constructor(
        private petsRepository: IPets
    ) {}

    async handle({ id }: FindPetByIdRequest): Promise<FindPetByIdResponse> {
        const pet = await this.petsRepository.findById(id)

        if(!pet) throw new Error('Pet not exists')

        return {
            pet
        }
    }
}
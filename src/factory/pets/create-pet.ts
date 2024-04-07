import { PetsRepository } from "../../repository/pets-repository";
import { CreatePetsService } from "../../service/pets/create-pets-service";

export function createPet() {
    const petsRepository = new PetsRepository()
    const createPetsService = new CreatePetsService(petsRepository)

    return createPetsService
}
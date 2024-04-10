import { PetsRepository } from "../../repository/pets-repository";
import { FindPetByIdService } from "../../service/pets/find-pet-by-id-service";

export function findPetById() {
    const petsRepository = new PetsRepository()
    const findPetByIdService = new FindPetByIdService(petsRepository)

    return findPetByIdService
}
import { PetsRepository } from "../../repository/pets-repository";
import { FindPetByCharacteristicsService } from "../../service/pets/find-pet-by-characteristics-service";

export function findPetByCharacteristics() {
    const petsRepository = new PetsRepository()
    const findPetByCharacteristicsService = new FindPetByCharacteristicsService(petsRepository)

    return findPetByCharacteristicsService
}
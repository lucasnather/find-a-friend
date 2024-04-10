import { PhotosRepository } from "../../repository/photos-repository";
import { CreatePhotoService } from "../../service/photos/create-photos-service";

export function createPhoto() {
    const photosRepository = new PhotosRepository()
    const createPhotosService = new CreatePhotoService(photosRepository)

    return createPhotosService
}
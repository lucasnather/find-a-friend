import { Photos } from "@prisma/client";
import { IPhotos } from "../../interface/i-photos";

interface CreatePhotoRequest {
    photo: string
    petsId: number
}

interface CreatePhotoResponse {
    photos: Photos
}

export class CreatePhotoService {

    constructor(
        private photosRepository: IPhotos
    ) {}

    async handle({ petsId, photo }: CreatePhotoRequest): Promise<CreatePhotoResponse> {
        const photos = await this.photosRepository.create({
            petsId,
            photo
        })

        return {
            photos
        }
    }
}
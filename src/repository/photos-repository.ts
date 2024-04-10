import { Prisma } from "@prisma/client";
import { IPhotos } from "../interface/i-photos";
import { prisma } from "../lib/prisma";

export class PhotosRepository implements IPhotos {

    async create(data: Prisma.PhotosUncheckedCreateInput) {
        const photos = await prisma.photos.create({
            data: {
                photo: data.photo,
                petsId: data.petsId
            }
        })

        return photos
    }

}
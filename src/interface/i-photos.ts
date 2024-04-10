import { Photos, Prisma } from "@prisma/client";

export interface IPhotos {
    create(data: Prisma.PhotosUncheckedCreateInput): Promise<Photos>
}
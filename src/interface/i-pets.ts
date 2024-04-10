import { AdoptionRequirements, Pets, Photos, Prisma } from "@prisma/client";

export interface IPets {
    create(data: Prisma.PetsUncheckedCreateInput, requirements: string[]): Promise<Pets>
    findById(id: number): Promise<Pets | null>
}
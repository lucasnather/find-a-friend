import { Pets, Prisma } from "@prisma/client";

export interface IPets {
    create(data: Prisma.PetsUncheckedCreateInput, requirements: string[]): Promise<Pets>
}
import { Pets, Prisma } from "@prisma/client";

export interface CharacteristicsProps {
    city: string
    age?: number
    size?: string
    energy?: string
    independence?: string
    ambience?: string
}

export interface IPets {
    create(data: Prisma.PetsUncheckedCreateInput, requirements: string[]): Promise<Pets>
    findById(id: number): Promise<Pets | null>
    findByCharacteristic(characteristics: CharacteristicsProps): Promise<Pets[] | null>
}
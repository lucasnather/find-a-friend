import { Prisma } from "@prisma/client";
import { IPets } from "../interface/i-pets";
import { prisma } from "../lib/prisma";

export class PetsRepository implements IPets {

    async create(data: Prisma.PetsUncheckedCreateInput, requirements: string[]) {
        const pets = await prisma.pets.create({
            data: {
                about: data.about,
                age: data.age,
                ambience: data.ambience,
                energy: data.energy,
                independence: data.independence,
                name: data.name,
                size: data.size,
                orgsId: data.orgsId,
                AdoptionRequirements: {
                    createMany: {
                        data: requirements.map((requirement) => {
                            return { 
                                requirement
                            }
                        })
                    }
                }
            }
        })

        return pets
    }

}
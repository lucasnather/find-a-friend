import { Prisma } from "@prisma/client";
import { CharacteristicsProps, IPets } from "../interface/i-pets";
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

    async findById(id: number) {
        const pets = await prisma.pets.findUnique({
            where: {
                id
            },
            include: {
                AdoptionRequirements: {
                    select: {
                        id: true,
                        requirement: true
                    }
                },
                Photos: {
                    select: {
                        id: true,
                        photo: true
                    }
                },
                org: {
                    select: {
                        cep: true,
                        city: true,
                        uf: true,
                        address: true,
                        whatsapp: true
                    }
                }
            }
        })

        if(!pets) return null

        return pets
    }

    async findByCharacteristic(characteristics: CharacteristicsProps) {
        const pets = await prisma.pets.findMany({
            where: {
                AND: [
                    {   
                        org: {
                            city: characteristics.city
                        }
                    },
                    {
                        age: characteristics.age,
                        
                    },
                    {
                        ambience: characteristics.ambience,

                    },
                    {
                        energy: characteristics.energy,                    
                    },
                    {
                        independence: characteristics.independence,
                    },
                    {
                        size: characteristics.size,
                    }
                ]
            },
            include: {
                AdoptionRequirements: {
                    select: {
                        id: true,
                        requirement: true
                    }
                },
                Photos: {
                    select: {
                        id: true,
                        photo: true
                    }
                },
                org: {
                    select: {
                        cep: true,
                        city: true
                    }
                }
            },
            
        })

        if(!pets) return null

        return pets
    }
    
    
}
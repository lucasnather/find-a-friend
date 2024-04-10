import { Prisma } from "@prisma/client";
import { IOrgs } from "../interface/i-orgs";
import { prisma } from "../lib/prisma";

export class OrgsRepository implements IOrgs {
    
    async create(data: Prisma.OrgsCreateInput) {
        const orgs = await prisma.orgs.create({
            data: {
                charge: data.charge,
                email: data.email,
                cep: data.cep,
                city: data.city,
                uf: data.uf,
                address: data.address,
                whatsapp: data.whatsapp,
                password: data.password,
            }
        })
        
        return orgs
    }
    
    async findByCepAndEmail(cep: string, email: string) {
        const orgs = await prisma.orgs.findUnique({
            where: {
                email_cep: {
                    email,
                    cep
                }
            }
        })
        
        const isOrgNotExist = !orgs
        
        if(isOrgNotExist)  return null
        
        return orgs
    }
    
    async findByEmail(email: string) {
        const orgs = await prisma.orgs.findFirst({
            where: {
                email
            }
        })

        const isOrgNotExist = !orgs

        if(isOrgNotExist) return null

        return orgs
    }
}
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

module.exports = function getPrismaClient() {
    if (!prisma) {
        prisma = new (require('@prisma/client').PrismaClient)()
    }
    return prisma
}

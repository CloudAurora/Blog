import { PrismaClient } from '@prisma/client';
import { Resolver, Query } from "type-graphql";
import { User } from "./type-defs";

const prisma = new PrismaClient();
@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return "hi"
    }

    @Query(() => [User])
    users() {
        return prisma.user.findMany();
    }

}
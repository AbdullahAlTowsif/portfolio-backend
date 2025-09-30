import { Prisma, User } from "@prisma/client"
import { prisma } from "../../config/db"


const getMyself = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            picture: true,
            createdAt: true,
            updatedAt: true
        }
    })
    return result;
}

export const UserService = {
    getMyself,
}
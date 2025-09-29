import { Prisma, User } from "@prisma/client"
import { prisma } from "../../config/db"
import bcrypt from "bcrypt"


const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    const { email, password, ...rest } = payload;

    const isUserExist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (isUserExist) {
        throw new Error("User Already Exist")
    }

    const hashedPassword = await bcrypt.hash(password as string, Number(process.env.BCRYPT_SALT_ROUND))

    const createdUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            ...rest
        }
    });

    return createdUser

}

export const UserService = {
    createUser,
}
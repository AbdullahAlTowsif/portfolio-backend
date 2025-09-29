import { prisma } from "../../config/db";
import bcrypt from "bcrypt";

const loginWithCredentials = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    // console.log(user);

    if (!user) {
        throw new Error("User not found!")
    }
    const isPasswordMatched = await bcrypt.compare(password as string, user.password as string)

    if (isPasswordMatched) {
        return user
    }
    else {
        throw new Error("Password is incorrect!")
    }
}

export const AuthService = {
    loginWithCredentials,
}
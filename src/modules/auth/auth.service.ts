import { prisma } from "../../config/db";

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
    return user;
}

export const AuthService = {
    loginWithCredentials,
}
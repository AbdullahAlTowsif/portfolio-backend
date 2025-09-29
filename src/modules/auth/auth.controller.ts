import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginWithCredentials = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.loginWithCredentials(req.body)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}


export const AuthController = {
    loginWithCredentials,
}
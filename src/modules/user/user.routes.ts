import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/:id", UserController.getMyself);


export const UserRouter = router;

import { Router } from "express";
import { validateData } from "../middlewares/validate.middleware";
import { requestLoginSchema } from "../schemas/login.schema";
import { loginController } from "../controllers/login.controllers";


export const loginRouter = Router()

loginRouter.post('', validateData(requestLoginSchema),loginController)
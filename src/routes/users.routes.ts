import { Router } from "express";
import { validateData } from "../middlewares/validate.middleware";
import { userAdminSchema, userUpdateDataSchema } from "../schemas/users.schema";
import { ensureEmailNotExistsMiddleware } from "../middlewares/ensureEmailNotExists.middleware";
import { createUsersController, deleteUserController, retrieveUsersController, updateUserController } from "../controllers/users.controllers";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";


export const usersRouter: Router = Router()

usersRouter.post('', validateData(userAdminSchema), ensureEmailNotExistsMiddleware,createUsersController)
usersRouter.get('', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware ,retrieveUsersController)
usersRouter.patch('/:id', validateData(userUpdateDataSchema), ensureUserExistsMiddleware, ensureEmailNotExistsMiddleware, ensureTokenIsValidMiddleware, updateUserController)
usersRouter.delete('/:id', ensureUserExistsMiddleware, ensureTokenIsValidMiddleware, ensureIsAdminMiddleware,deleteUserController)
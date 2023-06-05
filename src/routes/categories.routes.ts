import { Router } from "express";
import { categoryRequestSchema } from "../schemas/categories.schema";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureCategoryNameNotExistsMiddleware } from "../middlewares/ensureCategoryNameNotExists.middleware";
import { createCategoriesController, retrieveCategoriesController, retrieveImoveisByCategoryController } from "../controllers/categories.controllers";
import { validateData } from "../middlewares/validate.middleware";
import { ensureCategoryExistsMiddleware } from "../middlewares/ensureCategoryExists.middleware";


export const categoriesRouter = Router()

categoriesRouter.post('', validateData(categoryRequestSchema), ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureCategoryNameNotExistsMiddleware,createCategoriesController)

categoriesRouter.get('', retrieveCategoriesController)

categoriesRouter.get('/:id/realEstate', ensureCategoryExistsMiddleware,retrieveImoveisByCategoryController)
import { Router } from "express";
import { categoryRequestSchema } from "../schemas/categories.schema";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureCategoryNameNotExistsMiddleware } from "../middlewares/ensureCategoryNameNotExists.middleware";
import { createCategoriesController, retrieveCategoriesController, retrieveImoveisByCategoryController } from "../controllers/categories.controllers";
import { validateData } from "../middlewares/validate.middleware";
import { ensureCategoryExistsMiddleware } from "../middlewares/ensureCategoryExists.middleware";
import { schedulesSchemaRequest } from "../schemas/schedule.schema";
import { createSchedulesController, retrieveSchedulesController } from "../controllers/schedules.controllers";
import { validateSchedule } from "../middlewares/schedule.middleware";
import { ensureRealEstateExistsMiddleware } from "../middlewares/ensureRealEstateExists.middleware";


export const schedulesRouter = Router()

schedulesRouter.post('', ensureTokenIsValidMiddleware,validateData(schedulesSchemaRequest), validateSchedule,createSchedulesController)

schedulesRouter.get('/realEstate/:id', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureRealEstateExistsMiddleware,retrieveSchedulesController)
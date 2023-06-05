import { Router } from "express";
import { Routes } from "react-router-dom";
import { ensureAddressNotExistsMiddleware } from "../middlewares/ensureAddressNotExists.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { createRealEstateController, retrieveRealEstateController } from "../controllers/realEstate.controllers";
import { validateData } from "../middlewares/validate.middleware";
import { realEstateSchemaRequest } from "../schemas/realEstate.schema";

export const realEstateRouter = Router()

realEstateRouter.post('', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, validateData(realEstateSchemaRequest), ensureAddressNotExistsMiddleware, createRealEstateController)

realEstateRouter.get('', retrieveRealEstateController)
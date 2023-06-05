import { Request, Response } from "express";
import { TCategory, TCategoryRequest } from "../interfaces/categories.interfaces";
import { retrieveCategoriesService } from "../services/categories/retrieveCategories.service";
import { TRealEstate, TRealEstateRequest } from "../interfaces/realEstate.interfaces";
import { createRealEstateService } from "../services/realEstate/createRealEstate.service";
import { retrieveRealEstateService } from "../services/realEstate/retrieveRealEstate.service";


export const createRealEstateController = async (request: Request, response: Response): Promise<Response> => {
	const token: string | undefined = request.headers.authorization

	const realEstateData: TRealEstateRequest = request.body

	const newRealEstate: TRealEstate = await createRealEstateService(realEstateData, token)

	return response.status(201).json(newRealEstate)
}


export const retrieveRealEstateController = async (request: Request, response: Response): Promise<Response> => {

	const listRealEstate: TRealEstate[] = await retrieveRealEstateService()

	return response.status(200).json(listRealEstate)
}


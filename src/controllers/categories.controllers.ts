import { Request, Response } from "express";
import { TUpdateData, TUser, TUserRequest, TUserResponse } from "../interfaces/users.interfaces";
import { retrieveUsersService } from "../services/users/retrieveUsers.service";
import { createCategoriesService } from "../services/categories/createCategories.service";
import { TCategory, TCategoryRequest } from "../interfaces/categories.interfaces";
import { retrieveCategoriesService } from "../services/categories/retrieveCategories.service";
import { TRealEstate } from "../interfaces/realEstate.interfaces";
import { retrieveImoveisByCategoryService } from "../services/categories/retrieveImoveisByCategory.service";


export const createCategoriesController = async (request: Request, response: Response): Promise<Response> => {

	const categoryData: TCategoryRequest = request.body

	const newCategory: TCategory = await createCategoriesService(categoryData)

	return response.status(201).json(newCategory)
}


export const retrieveCategoriesController = async (request: Request, response: Response): Promise<Response> => {

	const listCategories: TCategory[] = await retrieveCategoriesService()

	return response.status(200).json(listCategories)
}


export const retrieveImoveisByCategoryController =async (request: Request, response: Response): Promise<Response> => {
	
	const categoryId: number = parseInt(request.params.id)

	const listImoveis: TRealEstate[] = await retrieveImoveisByCategoryService(categoryId)

	return response.status(200).json(listImoveis)
}

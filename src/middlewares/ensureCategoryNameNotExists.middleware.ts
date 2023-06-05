import { Request, Response, NextFunction } from "express";
import { TUser, TUserRequest } from "../interfaces/users.interfaces";
import { Repository } from "typeorm";
import { Category, User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { TCategory } from "../interfaces/categories.interfaces";

export const ensureCategoryNameNotExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<TCategory | void> => {

	const categoryName: string = request.body.name

	const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)


	const category: Category[] | null = await categoryRepository.findBy({
		name: categoryName
	})

	if(category.length != 0){
		throw new AppError('Category already exists', 409)
	}

	return next()
}
import { Request, Response, NextFunction } from "express";
import { TUser, TUserRequest } from "../interfaces/users.interfaces";
import { Repository } from "typeorm";
import { Category, RealEstate, User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { TCategory } from "../interfaces/categories.interfaces";
import { TRealEstate } from "../interfaces/realEstate.interfaces";

export const ensureRealEstateExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<TRealEstate | void> => {

	const realEstateId: number = parseInt(request.params.id)

	const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)


	const realEstate: RealEstate[] | null = await realEstateRepository.findBy({
		id: realEstateId
	})

	if(realEstate.length == 0){
		throw new AppError('RealEstate not found', 404)
	}

	return next()
}
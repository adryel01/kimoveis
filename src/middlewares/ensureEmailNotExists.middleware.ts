import { Request, Response, NextFunction } from "express";
import { TUser, TUserRequest } from "../interfaces/users.interfaces";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export const ensureEmailNotExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<TUser | void> => {

	const userEmail: string = request.body.email

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	if(userEmail == undefined){
		return next()
	}

	const user: User[] | null = await userRepository.findBy({
		email: userEmail
	})

	if(user.length != 0){
		throw new AppError('Email already exists', 409)
	}

	return next()
}
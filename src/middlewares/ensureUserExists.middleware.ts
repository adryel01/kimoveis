import { Request, Response, NextFunction } from "express";
import { TUser, TUserRequest } from "../interfaces/users.interfaces";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export const ensureUserExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<TUser | void> => {

	const userId: number = parseInt(request.params.id)

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const user: User | null = await userRepository.findOneBy({
		id: userId
	})

	if(!user){
		throw new AppError('User not found', 404)
	}

	return next()
}
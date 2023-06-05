import { Request, Response, response } from "express";
import { TUpdateData, TUser, TUserResponse } from "../../interfaces/users.interfaces";
import { And, Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import jwt from 'jsonwebtoken'
import { userUpdateDataSchema, usersSchemaResponse } from "../../schemas/users.schema";

export const updateUserService = async (token: any,userId: number,paramsId: number, updateData: TUpdateData, isAdmin: boolean): Promise<TUserResponse> => {

	token = token.split(" ")[1]

	jwt.verify(token, process.env.SECRET_KEY!, (error: any, decode: any)=>{
		if(error){
			throw new AppError(error.message, 403)
		}
	})

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	if(paramsId != userId && !isAdmin){
		throw new AppError('Insufficient permission', 403)
	}

	if (isAdmin == true) {
		const user: User | any = await userRepository.findOne({
			where: {
				id: paramsId
			}
		})

		const newData = userRepository.create({ ...user, ...updateData })

		await userRepository.save(newData)

		const returnUpdateUser: any = usersSchemaResponse.parse(newData)

		return returnUpdateUser
	}

	

	const user: User | any = userRepository.findOne({
		where: {
			id: Number(userId)
		}
	})

	const newData = userRepository.create({
		...user, ...updateData
	})

	await userRepository.save(newData)

	const returnUpdateUser: any = usersSchemaResponse.parse(newData)

	return returnUpdateUser


}
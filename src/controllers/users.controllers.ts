import { Request, Response } from "express";
import { TUpdateData, TUser, TUserRequest, TUserResponse } from "../interfaces/users.interfaces";
import { usersSchemaRequest } from "../schemas/users.schema";
import { createUsersService } from "../services/users/createUsers.service";
import { User } from "../entities";
import { retrieveUsersService } from "../services/users/retrieveUsers.service";
import { updateUserService } from "../services/users/updateUsers.service";
import { deleteUserService } from "../services/users/deleteUsers.service";



export const createUsersController = async (request: Request, response: Response): Promise<Response> => {

	const userData: TUserRequest = request.body

	const newUser: TUserResponse = await createUsersService(userData)

	return response.status(201).json(newUser)
}


export const retrieveUsersController = async (request: Request, response: Response): Promise<Response> => {

	const token: string | undefined = request.headers.authorization

	const listUsers: TUserResponse[] = await retrieveUsersService(token)

	return response.status(200).json(listUsers)
}


export const updateUserController = async (request: Request, response: Response): Promise<Response> => {

	const token: string | undefined = request.headers.authorization

	const { isAdmin } = response.locals

	let { userId } = response.locals

	userId = parseInt(userId)

	const paramsId = parseInt(request.params.id)

	const updateData: TUpdateData = request.body

	const updatedUser: TUserResponse = await updateUserService(token, userId, paramsId, updateData, isAdmin)

	return response.status(200).json(updatedUser)

}


export const deleteUserController =async (request: Request, response: Response): Promise<Response> => {
	
	const paramsId = parseInt(request.params.id)

	const token: string | undefined = request.headers.authorization

	await deleteUserService(paramsId, token)

	return response.status(204)
}
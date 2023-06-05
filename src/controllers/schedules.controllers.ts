import { Request, Response } from "express";
import { TUpdateData, TUser, TUserRequest, TUserResponse } from "../interfaces/users.interfaces";
import { retrieveUsersService } from "../services/users/retrieveUsers.service";
import { createCategoriesService } from "../services/categories/createCategories.service";
import { TCategory, TCategoryRequest } from "../interfaces/categories.interfaces";
import { retrieveCategoriesService } from "../services/categories/retrieveCategories.service";
import { TRealEstate } from "../interfaces/realEstate.interfaces";
import { retrieveImoveisByCategoryService } from "../services/categories/retrieveImoveisByCategory.service";
import { TSchedule, TScheduleRequest } from "../interfaces/schedule.interfaces";
import { createSchedulesService } from "../services/schedules/createSchedules.service";
import { retrieveSchedulesService } from "../services/schedules/retrieveSchedules.service";


export const createSchedulesController = async (request: Request, response: Response): Promise<Response> => {

	const scheduleData: TScheduleRequest = request.body

	const token: string | undefined = request.headers.authorization

	await createSchedulesService(scheduleData, token)

	return response.status(201).json(
		{message: 'Schedule created'}
	)
}


export const retrieveSchedulesController = async (request: Request, response: Response): Promise<Response> => {

	const token: string | undefined = request.headers.authorization

	const realEstateId = parseInt(request.params.id)

	const listSchedules: TSchedule[] = await retrieveSchedulesService(realEstateId, token)

	return response.status(200).json(listSchedules)
}


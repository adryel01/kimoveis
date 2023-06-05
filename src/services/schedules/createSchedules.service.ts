import { TCategory, TCategoryRequest } from "../../interfaces/categories.interfaces";
import { Category, Schedule } from "../../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { categorySchema, categoryRequestSchema } from "../../schemas/categories.schema";
import { TSchedule, TScheduleRequest } from "../../interfaces/schedule.interfaces";
import { scheduleSchema } from "../../schemas/schedule.schema";
import jwt from 'jsonwebtoken'
import { AppError } from "../../errors";

export const createSchedulesService = async (scheduleData: TScheduleRequest, token: any): Promise<TSchedule> => {

	token = token.split(" ")[1]


	jwt.verify(token, process.env.SECRET_KEY!, (error: any, decode: any) => {
		if (error) {
			throw new AppError('jwt malformed', 401)
		}
	})

	const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)

	const schedule: Schedule = scheduleRepository.create(scheduleData)
	await scheduleRepository.save(schedule)

	const returnSchedule = scheduleSchema.parse(schedule)

	return returnSchedule
}
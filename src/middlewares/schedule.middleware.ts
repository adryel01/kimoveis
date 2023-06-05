import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Schedule } from '../entities';
import moment from 'moment';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors';

export async function validateSchedule(request: Request, response: Response, next: NextFunction) {
	const { date, hour, realEstateId } = request.body;

	const scheduleDate = moment(`${date} ${hour}`, 'YYYY-MM-DD HH:mm');
	const startBusinessHour = moment('08:00', 'HH:mm');
	const endBusinessHour = moment('18:00', 'HH:mm');
	if (!scheduleDate.isBetween(startBusinessHour, endBusinessHour)) {
		throw new AppError('Invalid hour, available times are 8AM to 18PM',400)
	}


	if (scheduleDate.isoWeekday() >= 6) {
		throw new AppError('Invalid date, work days are monday to friday', 400)
	}


	const existingSchedule = await AppDataSource.getRepository(Schedule)
		.createQueryBuilder('schedule')
		.where('schedule.date = :date AND schedule.hour = :hour', { date, hour })
		.getOne();
	if (existingSchedule) {
		throw new AppError('Schedule to this real estate at this date and time already exists',409)
	}


	const userId = response.locals.id;
	const existingUserSchedule = await AppDataSource.getRepository(Schedule)
		.createQueryBuilder('schedule')
		.where('schedule.date = :date AND schedule.hour = :hour AND schedule.userId = :userId AND schedule.realEstateId != :realEstateId', { date, hour, userId, realEstateId })
		.getOne();
	if (existingUserSchedule) {
		throw new AppError('User schedule to this real estate at this date and time already exists',409)
	}

	return next();
}

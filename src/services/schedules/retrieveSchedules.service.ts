import { RealEstate, Schedule } from "../../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TRealEstate } from "../../interfaces/realEstate.interfaces";
import { realEstateSchema } from "../../schemas/realEstate.schema";
import { TSchedule } from "../../interfaces/schedule.interfaces";

export const retrieveSchedulesService = async (realEstateId: number, token: any):Promise<TSchedule[] | any> => {

	const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)

	const listSchedules: TSchedule[] | any = await scheduleRepository.createQueryBuilder('s')
	.leftJoinAndSelect('s.realEstateId','realEstate')
	.select(['s.id','s.date','s.hour','s.realEstateId','s.userId'])
	.where('s.realEstateId = :realEstate', {realEstate: realEstateId})
	.getMany()

	return listSchedules
}
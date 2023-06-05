import { RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TRealEstate } from "../../interfaces/realEstate.interfaces";
import { realEstateSchema } from "../../schemas/realEstate.schema";

export const retrieveRealEstateService = async ():Promise<TRealEstate[] | any> => {

	const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

	const listRealEstate : RealEstate[] | any = await realEstateRepository.find()

	return listRealEstate
}
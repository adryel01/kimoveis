import { TCategory } from "../../interfaces/categories.interfaces";
import { Category, RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { categorySchema } from "../../schemas/categories.schema";
import { TRealEstate } from "../../interfaces/realEstate.interfaces";

export const retrieveImoveisByCategoryService = async (categoryId: number):Promise<TRealEstate[]| any> => {

	const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

	const listImoveis: TRealEstate[] | any = await realEstateRepository.createQueryBuilder('re')
	.leftJoinAndSelect('re.category','categories')
	.select(['re.id','re.sold','re.value','re.size','re.createdAt','re.updatedAt','re.categoryId','re.addressId'])
	.where('re.categoryId = :category', {category: categoryId})
	.getMany()

	return listImoveis
}
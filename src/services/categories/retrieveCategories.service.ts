import { TCategory } from "../../interfaces/categories.interfaces";
import { Category } from "../../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { categorySchema } from "../../schemas/categories.schema";

export const retrieveCategoriesService = async ():Promise<TCategory[]> => {

	const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

	const listCategories: TCategory[] = await categoryRepository.find()

	return listCategories
}
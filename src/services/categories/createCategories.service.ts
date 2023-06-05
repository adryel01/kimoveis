import { TCategory, TCategoryRequest } from "../../interfaces/categories.interfaces";
import { Category } from "../../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { categorySchema, categoryRequestSchema } from "../../schemas/categories.schema";

export const createCategoriesService = async (categoryData: TCategoryRequest): Promise<TCategory> => {

	const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

	const category: Category = categoryRepository.create(categoryData)
	await categoryRepository.save(category)

	const returnCategory = categorySchema.parse(category)

	return returnCategory
}
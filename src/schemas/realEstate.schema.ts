import { z } from 'zod'
import { categorySchema } from './categories.schema'


export const realEstateSchema = z.object({
	id: z.number(),
	category: categorySchema,
	value: z.string().or(z.number().positive()).default(0),
	size: z.number().int().positive(),
	address: z.object({
		street: z.string().max(45),
		zipCode: z.string().max(8),
		number: z.string().max(7).nullish(),
		city: z.string().max(20),
		state: z.string().max(2)
	}),
	sold: z.boolean().default(false),
	createdAt: z.string(),
	updatedAt: z.string()
})

export const realEstateSchemaRequest = realEstateSchema.omit({ id: true, sold: true, createdAt: true, updatedAt: true , category: true}).extend({categoryId: z.number()})

export const realEstateSchemaResponse = realEstateSchema.omit({category: true}).extend({categoryId: z.number(), addressId: z.number()})
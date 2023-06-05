import {z} from 'zod'

export const scheduleSchema = z.object({
	id: z.number(),
	date: z.string(),
	hour: z.string(),
	realEstateId: z.number().int().positive(),
	userId: z.number()
})

export const schedulesSchemaRequest = scheduleSchema.omit({id: true, userId: true})
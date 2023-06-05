import {z} from 'zod'

export const usersSchema = z.object({
	id: z.number(),
	name: z.string().max(45),
	email: z.string().email().max(45),
	password: z.string().max(120),
	hashPassword: z.function(),
	admin: z.boolean().default(false),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullish()
})

export const usersSchemaRequest = usersSchema.omit({id: true, createdAt: true, updatedAt: true, deletedAt: true, hashPassword:true})

export const userAdminSchema = usersSchemaRequest.partial({admin: true})

export const usersSchemaResponse = usersSchema.omit({password: true, hashPassword: true})

export const listSchemaResponse = z.object({
	id: z.number(),
	name: z.string().max(45),
	email: z.string().email().max(45),
	admin: z.boolean().default(false),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullish()
})

export const userUpdateDataSchema = usersSchema.omit({id: true, admin: true, hashPassword:true}).partial()

export const deleteUsersSchema = usersSchema.pick({deletedAt: true})
import {z} from 'zod'
import { userUpdateDataSchema, usersSchema, usersSchemaRequest, usersSchemaResponse } from '../schemas/users.schema'
import { type } from 'os'

export type TUser = z.infer<typeof usersSchema>

export type TUserRequest = z.infer<typeof usersSchemaRequest>

export type TUserResponse = z.infer<typeof usersSchemaResponse>

export type TUpdateData = z.infer<typeof userUpdateDataSchema>
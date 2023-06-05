import {z} from 'zod'
import { scheduleSchema, schedulesSchemaRequest } from '../schemas/schedule.schema'

export type TSchedule = z.infer<typeof scheduleSchema>

export type TScheduleRequest = z.infer<typeof schedulesSchemaRequest>
import {z} from 'zod'
import { categoryRequestSchema, categorySchema } from '../schemas/categories.schema'

export type TCategory = z.infer<typeof categorySchema>

export type TCategoryRequest = z.infer<typeof categoryRequestSchema>
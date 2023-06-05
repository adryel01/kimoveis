import {z} from 'zod'
import { realEstateSchema, realEstateSchemaRequest, realEstateSchemaResponse } from '../schemas/realEstate.schema'

export type TRealEstate = z.infer<typeof realEstateSchema>

export type TRealEstateRequest = z.infer<typeof realEstateSchemaRequest>

export type TRealEstateResponse = z.infer<typeof realEstateSchemaResponse>
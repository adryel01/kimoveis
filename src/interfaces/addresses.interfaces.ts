import {z} from 'zod'
import { addressSchema, addressSchemaObject, addressSchemaRequest } from '../schemas/addresses.schema'

export type TAddress = z.infer<typeof addressSchema>

export type TAddressRequest = z.infer<typeof addressSchemaRequest>

export type TAddressObject = z.infer<typeof addressSchemaObject>
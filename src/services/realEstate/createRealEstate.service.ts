import { Address, RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TRealEstate } from "../../interfaces/realEstate.interfaces";
import { realEstateSchema, realEstateSchemaResponse } from "../../schemas/realEstate.schema";
import jwt from 'jsonwebtoken'
import { AppError } from "../../errors";
import { TAddress } from "../../interfaces/addresses.interfaces";

export const createRealEstateService = async (realEstateData: any, token: any): Promise<TRealEstate> => {

	token = token.split(" ")[1]


	jwt.verify(token, process.env.SECRET_KEY!, (error: any, decode: any) => {
		if (error) {
			throw new AppError('jwt malformed', 401)
		}
	})

	const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

	const realEstate: TRealEstate | any = await realEstateRepository.create(realEstateData)
	await realEstateRepository.save(realEstate)

	const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)

	const address: TAddress | any = await addressRepository.create({
		street: realEstateData.address.street,
		zipCode: realEstateData.address.zipCode,
		city: realEstateData.address.city,
		state: realEstateData.address.state,
		number: realEstateData.address.number
	})
	await addressRepository.save(address)

	const responseAddress = await addressRepository.find({
		where: {
			street: realEstateData.address.street,
			zipCode: realEstateData.address.zipCode,
			city: realEstateData.address.city,
			state: realEstateData.address.state,
			number: realEstateData.address.number
		}
	})

	console.log(responseAddress[0].id)

	const response = {
		...realEstateData,
		addressId: responseAddress[0].id,
		...{
			address:
			{
				
				street: responseAddress[0].street,
				zipCode: responseAddress[0].zipCode,
				city: responseAddress[0].city,
				state: responseAddress[0].state,
				number: responseAddress[0].number
			}
		}
	}
	console.log(response)

	// console.log(realEstate)

	// const returnRealEstate = realEstateSchema.parse(realEstate)

	return response
}
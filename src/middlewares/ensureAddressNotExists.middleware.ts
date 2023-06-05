import { Request, Response, NextFunction } from "express";
import { TUser, TUserRequest } from "../interfaces/users.interfaces";
import { Repository } from "typeorm";
import { Address, User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { TAddress, TAddressRequest } from "../interfaces/addresses.interfaces";

export const ensureAddressNotExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<TAddress | void> => {

	const realEstateAddress: TAddressRequest = request.body.address

	const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)

	const address: TAddress[] | null = await addressRepository.find({
		where:{
			street: realEstateAddress.street,
			zipCode: realEstateAddress.zipCode,
			city: realEstateAddress.city,
			state: realEstateAddress.state,
			number: realEstateAddress.number||''
		}
	})

	if(address.length != 0){
		throw new AppError('Address already exists', 409)
	}

	return next()
}
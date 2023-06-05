import { TUserResponse } from "../../interfaces/users.interfaces";
import jwt from 'jsonwebtoken'
import { AppError } from "../../errors";
import { error } from "console";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { listSchemaResponse, usersSchemaResponse } from "../../schemas/users.schema";

export const retrieveUsersService = async (token: string | undefined): Promise<TUserResponse[]> => {


	if(token){

		token = token.split(" ")[1]
		jwt.verify(token, process.env.SECRET_KEY!, (error: any, decode: any)=>{
			if(error){
				throw new AppError(error.message, 403)
			}
		})

		const userRepository: Repository<User> = AppDataSource.getRepository(User)

		const listUsers: any  = await userRepository.find()

		let returnListUsers: any = listUsers.map((element:any) => listSchemaResponse.parse(element) )
		
		return returnListUsers
	}else {
		throw new AppError('Token is missing', 403)
	}


	

}
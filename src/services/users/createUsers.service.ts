import { TUser, TUserRequest, TUserResponse } from "../../interfaces/users.interfaces";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { usersSchema, usersSchemaResponse } from "../../schemas/users.schema";

export const createUsersService = async (userData: TUserRequest): Promise<TUserResponse> => {

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const user: User = userRepository.create(userData)
	await userRepository.save(user)

	const returnUser = usersSchemaResponse.parse(user)

	return returnUser
}
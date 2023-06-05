import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { AppError } from "../../errors"
import jwt from 'jsonwebtoken'

export const deleteUserService = async (paramsId: number, token: any): Promise<void> => {

	token = token.split(" ")[1]


	jwt.verify(token, process.env.SECRET_KEY!, (error: any, decode: any) => {
		if (error) {
			throw new AppError('jwt malformed', 401)
		}
	})



	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const user: any = userRepository.findOne({
		where: {
			id: paramsId
		}
	})

	if (user?.deletedAt != null) {
		throw new AppError('User soft deleted', 404)
	}

	const deleted: string = (new Date()).toString()

	const userDeleted: any = userRepository.update(paramsId, { deletedAt: deleted })
	await userRepository.save(userDeleted)

	return userDeleted
}
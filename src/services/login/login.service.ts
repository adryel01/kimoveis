import { TLoginRequest, TLoginResponse } from "../../interfaces/login.interfaces";
import { TUser } from "../../interfaces/users.interfaces";
import { AppError } from "../../errors";
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";

export const loginService = async (payload: TLoginRequest): Promise<TLoginResponse | void> => {

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const user: User | null = await userRepository.findOne({
		where: {
			email: payload.email
		}
	})

	if (!user) {
		throw new AppError('Invalid credentials', 401)
	}

	const passwordMatch = await bcrypt.compare(payload.password, user.password)

	if (!passwordMatch) {
		throw new AppError('Invalid credentials', 401)
	}

	const token: string = jwt.sign(
		{
			admin: user.admin
		},
		process.env.SECRET_KEY!,
		{
			expiresIn: process.env.EXPIRES_IN!,
			subject: user.id.toString()
		}
	)


	return { token }
}
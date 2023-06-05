import { Request, Response, NextFunction } from "express";
import jwt , {decode} from 'jsonwebtoken'
import { AppError } from "../errors";
import 'dotenv/config'

export const ensureTokenIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	let token: string | undefined = request.headers.authorization


	if(!token){
		throw new AppError('Missing bearer token', 401)
	}
	token = token.split(" ")[1]

	jwt.verify(token, process.env.SECRET_KEY!, (error: any, decode: any)=>{
		if(error){
			throw new AppError(error.message, 401)
		}
		response.locals.isAdmin = decode.admin
		response.locals.userId = decode.sub

		
	})


	return next()
}
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import jwt from 'jsonwebtoken'

export const ensureIsAdminMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	const {isAdmin} = response.locals

	if(!isAdmin){
		throw new AppError("Insufficient permission", 403)
	}

	return next()
}
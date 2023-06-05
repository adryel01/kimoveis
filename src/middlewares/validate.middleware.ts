import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from 'zod'
import { AppError } from "../errors";

export const validateData = (schema: ZodTypeAny) => (request: Request, response: Response, next: NextFunction): void => {

	const validatedBody = schema.parse(request.body)

	request.body = validatedBody

	return next()
}
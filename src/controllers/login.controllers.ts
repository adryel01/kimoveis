import { Request, Response } from "express"
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interfaces"
import { requestLoginSchema } from "../schemas/login.schema"
import { loginService } from "../services/login/login.service"

export const loginController =async (request: Request, response: Response): Promise<Response> => {
	
	const payload: TLoginRequest = request.body

	const token: TLoginResponse | void = await loginService(payload)

	return response.status(200).json(token)
}
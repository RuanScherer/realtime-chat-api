import jwt from'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
const authConfig = require('../config/auth')

interface ITokenPayload {
  iat: number;
  exp: number;
  id: number;
}

export default (request: Request<{}, {}, { userId: number }>, response: Response, next: NextFunction) => {
	const authHeader = request.headers.authorization

	if (!authHeader) return response.status(401).send()

	try {
		const decoded = jwt.verify(authHeader, authConfig.appKey)
		const { id } = decoded as ITokenPayload
		request.body.userId = id
		return next()
	}
	catch (err) {
		return response.status(401).send()
	}
}
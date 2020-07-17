import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const authConfig = require('../config/auth.json')

function generateToken(params: object) {
	return jwt.sign(params, authConfig.appKey, { expiresIn: 86400 })
}

class UserController {
	public async auth(request: Request, response: Response) {
		const { username, password } = request.body

		if (!username || !password) return response.status(400).send()
		const user = await User.findOne({ username }).select('+password')
		if (!user) return response.status(400).send()

		if(!await bcrypt.compare(password, user.password)) return response.status(400).send()

		return response.send({ token: generateToken({ id: user._id, username: user.username }) })
	}
	
	public async store(request: Request, response: Response) {
		const { username, password } = request.body

		if (!username || !password) return response.status(400).send()
		const alreadyExists = await User.find({ username })
		if (alreadyExists.length) return response.status(400).send()

		const hash = await bcrypt.hash(password, 10)
		const user = await User.create({ username, password: hash })
		if (!user) return response.send(500)
		return response.send({ token: generateToken({ id: user._id, username: user.username }) })
	}

	public async show(request: Request, response: Response) {
		const search = request.query.search as string
		const users = await User.find().where({ username: new RegExp(search, 'i') })

		if (!users) return response.status(400).send()
		return response.send({ users })
	}
}

export default new UserController()
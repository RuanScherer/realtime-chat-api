import { Request, Response } from 'express'
import Message from '../models/Message'

class MessageController {
	public async index(request: Request, response: Response) {
		const messages = await Message.find()

		if (!messages) return response.status(500).send()

		return response.send({ messages })
	}

	public async store(request: Request, response: Response) {
		const { username, content } = request.body

		if (!username || !content) return response.status(400).send()

		const message = await Message.create({ username, content })

		if (!message) return response.status(500).send()

		return response.send({ message })
	}
}

export default new MessageController()
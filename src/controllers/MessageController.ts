import { Request, Response } from 'express'
import Message from '../models/Message'

class MessageController {
	public async store(request: Request, response: Response) {
		const { username, content } = request.body

		if (!username || !content) return response.send(400)

		const message = await Message.create({ username, content })

		return response.send({ message })
	}
}

export default new MessageController()
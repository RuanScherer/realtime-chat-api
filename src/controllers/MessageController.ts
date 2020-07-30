import { Request, Response } from 'express'
import Message from '../models/Message'
import User from '../models/User'

class MessageController {
	public async index(request: Request, response: Response) {
		const messages = await Message.find().sort({'createdAt': -1})

		if (!messages) return response.status(500).send()
		return response.send({ messages })
	}

	public async store(request: Request, response: Response) {
		let { to, content } = request.body

		if (!content) return response.status(400).send()
		
		const from = await User.findById(request.body.userId)
		if (!from) return response.status(400).send()

		if (to) {
			to = await User.findById(to)
			if (!to) return response.status(400).send()
		}

		const message = await Message.create({ 
			from,
			to: to ? to : null,
			content
		})

		if (!message) return response.status(500).send()
		return response.send({ message })
	}

	public async show(request: Request, response: Response) {
		const { userId } = request.body
		const { id } = request.params

		const messages = await Message.find().where({ 
			from: "ruans",
			to: id
		}).sort({'createdAt': -1})

		if (!messages.length) return response.status(400).send()
		return response.send({ messages })
	}
}

export default new MessageController()
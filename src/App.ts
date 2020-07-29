import express from 'express'
import cors from 'cors'
import router from './routes'
import mongoose from 'mongoose'

class App {
	public express: express.Application
	public router: express.Router

	public constructor(router: express.Router) {
		this.express = express()
		this.router = router

		this.middlewares()
		this.routes()
		this.database()
	}

	private middlewares():void {
		this.express.use(express.json())
		this.express.use(cors())
	}

	private database(): void {
		mongoose.connect('mongodb+srv://usuario_admin:123@mycluster-lcfko.mongodb.net/realtime-chat?retryWrites=true&w=majority', {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		})
	}

	private routes():void {
		this.express.use(this.router)
	}
}

export default new App(router).express
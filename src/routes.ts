import express, { request, Request } from 'express'
import MessageController from './controllers/MessageController'

const router = express.Router()

router.post('/messages', MessageController.store)

export default router
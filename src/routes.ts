import express, { request, Request } from 'express'
import MessageController from './controllers/MessageController'
import UserController from './controllers/UserController'

const router = express.Router()

router.post('/users', UserController.store)
router.get('/messages', MessageController.index)
router.post('/messages', MessageController.store)

export default router
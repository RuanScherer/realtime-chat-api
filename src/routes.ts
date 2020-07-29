import express from 'express'
import MessageController from './controllers/MessageController'
import UserController from './controllers/UserController'
import authMiddleware from './middlewares/auth'

const router = express.Router()

router.post('/users', UserController.store)
router.post('/users/auth', UserController.auth)

router.use(authMiddleware)

router.get('/users/search', UserController.show)
router.put('/users/:id', UserController.update)
router.get('/messages', MessageController.index)
router.post('/messages', MessageController.store)

export default router
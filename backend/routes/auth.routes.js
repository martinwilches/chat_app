import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const authRouter = Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/register', AuthController.register)
authRouter.post('/logout', authMiddleware, AuthController.logout)

authRouter.get('/user', authMiddleware, AuthController.user)

export default authRouter

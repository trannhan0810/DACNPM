import { Router } from 'express'
import User from '../../../database/schemas/User'
import AuthController from './controller'
const routes = Router()
const authController = new AuthController()

routes.post("/register",authController.Register.bind(authController))
routes.post("/login", authController.Login.bind(authController))
export default routes
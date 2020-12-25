import { Router } from 'express'
import AuthController from './controller'
import  authenticateToken  from './middleware'
const routes = Router()
const authController = new AuthController()

/** 
 * @swagger
 * tags:
 *   name: Auth
 *   description: API to manage your brands.
 */

routes.get("/me", authenticateToken, authController.getMe.bind(authController))
routes.post("/register",authController.Register.bind(authController))
routes.post("/login", authController.Login.bind(authController))
export default routes
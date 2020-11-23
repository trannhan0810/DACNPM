import { Router } from 'express'
import User from '../../../database/schemas/User'
import UserController from './controller'
const routes = Router()
const userController = new UserController()

routes.get("/" , userController.authenticateToken , userController.getMany.bind(userController))
routes.get("/:id", userController.getById.bind(userController))
routes.post("/", userController.createOne.bind(userController))
routes.put("/:id", userController.updateOne.bind(userController))
routes.post("/register",userController.Register.bind(userController))
routes.post("/login", userController.Login.bind(userController))
export default routes
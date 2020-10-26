import { Router } from 'express'
import UserController from './controller'
const route = Router()
const userController = new UserController()

route.get("/", userController.getMany.bind(userController))
route.get("/:id", userController.getById.bind(userController))
route.post("/", userController.createOne.bind(userController))
export default route
import { Router } from 'express'
import UserController from './controller'
const routes = Router()
const userController = new UserController()
routes.get("/",[
    
], userController.getMany)
export default routes
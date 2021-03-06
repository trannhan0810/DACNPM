import { Router } from 'express'
import CategoryController from './controller'
import authorization from '../auth/middleware' 

const routes = Router()
const categoryController = new CategoryController()

routes.get("/", categoryController.getMany.bind(categoryController))
routes.get("/:id", categoryController.getById.bind(categoryController))
routes.post("/", categoryController.createOne.bind(categoryController))
routes.delete("/:id", categoryController.deleteOne.bind(categoryController))
routes.put("/:id", categoryController.updateOne.bind(categoryController))


export default routes
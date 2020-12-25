import { Router } from 'express'
import CategoryController from './controller'
import authorization from '../auth/middleware' 

const routes = Router()
const categoryController = new CategoryController()

routes.get("/", categoryController.getMany.bind(categoryController))
routes.get("/:id", categoryController.getById.bind(categoryController))
routes.post("/", authorization, categoryController.createOne.bind(categoryController))
routes.delete("/:id", authorization, categoryController.deleteOne.bind(categoryController))
routes.put("/:id", authorization, categoryController.updateOne.bind(categoryController))


export default routes
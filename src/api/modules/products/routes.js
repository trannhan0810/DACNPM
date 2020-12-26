import { Router } from 'express'
import ProductController from './controller'
import authorization from '../auth/middleware' 

const routes = Router()
const productController = new ProductController()

routes.get("/", productController.getManyWithRelation.bind(productController))
routes.get("/:id", productController.getByIdWithRelation.bind(productController))
routes.post("/", productController.createOne.bind(productController))
routes.delete("/:id", productController.deleteOne.bind(productController))
routes.put("/:id", productController.updateOne.bind(productController))

export default routes
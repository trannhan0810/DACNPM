import { Router } from 'express'
import ProductLowController from './controller'
import authorization from '../auth/middleware' 

const routes = Router()
const productLowController = new ProductLowController()

routes.get("/", productLowController.getManyWithRelation.bind(productLowController))
routes.get("/:id", productLowController.getByIdWithRelation.bind(productLowController))
routes.post("/", authorization, productLowController.createOne.bind(productLowController))
routes.delete("/:id", authorization, productLowController.deleteOne.bind(productLowController))
routes.put("/:id", authorization, productLowController.updateOne.bind(productLowController))

export default routes
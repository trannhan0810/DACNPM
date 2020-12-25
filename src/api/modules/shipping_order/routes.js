import { Router } from 'express'
import { authenticateToken } from '../auth/controller'
import ShippingOrderController from './controller'

const routes = Router()
const shippingOrderController = new ShippingOrderController()

routes.get("/", shippingOrderController.getMany.bind(shippingOrderController))

routes.post("/", shippingOrderController.createOne.bind(shippingOrderController))

routes.delete("/:id", shippingOrderController.deleteOne.bind(shippingOrderController))

routes.put("/:id", shippingOrderController.updateOne.bind(shippingOrderController))

export default routes
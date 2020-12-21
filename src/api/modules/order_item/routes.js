import { Router } from 'express'
import { authenticateToken } from '../auth/controller'
import OrderItemController from './controller'

const routes = Router()
const orderItemController = new OrderItemController()

routes.get("/", OrderItemController.getMany.bind(OrderItemController))

routes.post("/", OrderItemController.createOne.bind(OrderItemController))

routes.delete("/:id", OrderItemController.deleteOne.bind(OrderItemController))

routes.put("/:id", OrderItemController.updateOne.bind(OrderItemController))

export default routes
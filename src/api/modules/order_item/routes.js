import { Router } from 'express'
import { authenticateToken } from '../auth/controller'
import OrderItemController from './controller'

const routes = Router()
const orderItemController = new OrderItemController()

routes.get("/", orderItemController.getMany.bind(OrderItemController))

routes.post("/", orderItemController.createOne.bind(OrderItemController))

routes.delete("/:id", orderItemController.deleteOne.bind(OrderItemController))

routes.put("/:id", orderItemController.updateOne.bind(OrderItemController))

export default routes
import { Router } from 'express'
import authorization from '../auth/middleware' 
import OrderItemController from './controller'

const routes = Router()
const orderItemController = new OrderItemController()

routes.get("/", orderItemController.getMany.bind(OrderItemController))

routes.post("/", authorization, orderItemController.createOne.bind(OrderItemController))

routes.delete("/:id", authorization, orderItemController.deleteOne.bind(OrderItemController))

routes.put("/:id", authorization, orderItemController.updateOne.bind(OrderItemController))

export default routes
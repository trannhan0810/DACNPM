import { Router } from 'express'
import OrderController from './controller'


const routes = Router()
const orderController = new OrderController()

routes.get("/", orderController.getMany.bind(orderController))
routes.get("/:id", orderController.getById.bind(orderController))
routes.post("/", orderController.createOne.bind(orderController))
routes.delete("/:id", orderController.deleteOne.bind(orderController))
routes.put("/:id", orderController.updateOne.bind(orderController))

export default routes
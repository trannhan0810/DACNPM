import { Router } from 'express'
import OrderController from './controller'


const routes = Router()
const orderController = new OrderController()

routes.get("/", orderController.getFullOrder.bind(orderController))
routes.get("/:id", orderController.getById.bind(orderController))
routes.post("/", orderController.createOne.bind(orderController))
routes.delete("/:id", orderController.deleteOne.bind(orderController))
routes.put("/:id", orderController.updateOne.bind(orderController))
routes.post("/orderUser", orderController.getOrderbyUserId.bind(orderController))
routes.get("/status/:state", orderController.stateSubmitted.bind(orderController))
routes.get("/state/shipping/:id", orderController.getOrderShipping.bind(orderController))
routes.get("/state/processing", orderController.getOrderProcessing.bind(orderController))
routes.get("/state/submitted", orderController.getOrderSubmitted.bind(orderController))
routes.put("/cancelOrder/:id", orderController.cancelOrder.bind(orderController))
routes.post("/changeStatus/:id", orderController.changeStatus.bind(orderController))
routes.post("/takeOrder/:id", orderController.takenOrder.bind(orderController))
routes.get("/ShippingOrder/getFullOrderShipping", orderController.getStateShippingOrder.bind(orderController))
routes.get("/statistic/Revenue", orderController.statisticsRevenue.bind(orderController))
routes.put("/state/done/:id", orderController.orderSuccess.bind(orderController))
export default routes
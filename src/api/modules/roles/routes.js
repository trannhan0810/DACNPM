import { Router } from 'express'
import RoleController from './controller'
const routes = Router()
const roleController = new RoleController()

routes.get("/" , roleController.getMany.bind(roleController))
routes.get("/:id", roleController.getById.bind(roleController))
routes.post("/", roleController.createOne.bind(roleController))
routes.put("/:id", roleController.updateOne.bind(roleController))
routes.delete("/:id", roleController.deleteOne.bind(roleController))
routes.get("/permiss/list", roleController.getAllRoleAndPermiss.bind(roleController))
export default routes
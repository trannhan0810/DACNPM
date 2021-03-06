import { Router } from 'express'
import PermissionController from './controller'
import authorization from '../auth/middleware' 
const routes = Router()
const permissionController = new PermissionController()

routes.get("/" , permissionController.getMany.bind(permissionController))
routes.get("/:id", permissionController.getById.bind(permissionController))
routes.post("/", permissionController.createOne.bind(permissionController))
routes.put("/:id", permissionController.updateOne.bind(permissionController))
routes.delete("/:id", permissionController.deleteOne.bind(permissionController))
export default routes
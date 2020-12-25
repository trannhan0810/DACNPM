import { Router } from 'express'
import PermissionController from './controller'
import authorization from '../auth/middleware' 
const routes = Router()
const permissionController = new PermissionController()

routes.get("/" , permissionController.getMany.bind(permissionController))
routes.get("/:id", permissionController.getById.bind(permissionController))
routes.post("/",  authorization, permissionController.createOne.bind(permissionController))
routes.put("/:id",  authorization, permissionController.updateOne.bind(permissionController))
routes.delete("/:id",  authorization, permissionController.deleteOne.bind(permissionController))
export default routes
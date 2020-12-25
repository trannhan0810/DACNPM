import { Router } from 'express'
import BrandController from './controller'
import authorization from '../auth/middleware' 

/** @swagger
 * tags:
 *   name: Brand
 *   description: API to manage your brands.
 */

const routes = Router()
const brandController = new BrandController()

routes.get("/", brandController.getMany.bind(brandController))
routes.get("/:id", brandController.getById.bind(brandController))
routes.post("/", authorization, brandController.createOne.bind(brandController))
routes.delete("/:id", authorization, brandController.deleteOne.bind(brandController))
routes.put("/:id", authorization, brandController.updateOne.bind(brandController))

export default routes
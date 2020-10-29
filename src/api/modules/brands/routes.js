import { Router } from 'express'
import BrandController from './controller'

/** @swagger
 * tags:
 *   name: Brand
 *   description: API to manage your brands.
 */

const routes = Router()
const brandController = new BrandController()

routes.get("/", brandController.getMany.bind(brandController))
/**
 * @swagger
 * path:
 *  /brands/:
 *    get:
 *      summary: Get all brand map params
 *      tags: [Brand]
 *      parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        description: If have params return list of brands map the params else return all brands
 *      responses:
 *        "200":
 *          description: Return a list brands map the params.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Brand'
 */ 


routes.get("/:id", brandController.getById.bind(brandController))
/**
 * @swagger
 * path:
 *  /brands/{id}/:
 *    get:
 *      summary: Get one brand by id
 *      tags: [Brand]
 *      responses:
 *        "200":
 *          description: Return one brand.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Brand'
 */ 


routes.post("/", brandController.createOne.bind(brandController))
/**
 * @swagger
 * path:
 *  /brands/:
 *    post:
 *      summary: Create new brand
 *      tags: [Brand]
 *      requestBody:
 *        description: Optional description in *Markdown*
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BrandWithoutID'
 *      responses:
 *        "200":
 *          description: Return created brand.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Brand'
 */ 


routes.delete("/:id", brandController.deleteOne.bind(brandController))
/**
 * @swagger
 * path:
 *  /brands/{id}/:
 *    delete:
 *      summary: Delete a brand
 *      tags: [Brand]
 *      responses:
 *        "200":
 *          description: Return delete info.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Brand'
 */ 


routes.put("/:id", brandController.updateOne.bind(brandController))
/**
 * @swagger
 * path:
 *  /brands/{id}/:
 *    put:
 *      summary: Update a brand
 *      tags: [Brand]
 *      requestBody:
 *        description: Optional description in *Markdown*
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BrandWithoutID'
 *      responses:
 *        "200":
 *          description: Return brand before updated.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Brand'
 */ 

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Brand:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          description: Auto-gen mongodb key
 *        name:
 *          type: string
 *          description: Brand's name
 *      example:
 *        id: 5f945a54ec925e046a5d4e92
 *        name: Asus
 *    BrandWithoutID:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: Brand's name
 *      example:
 *        name: Asus
 */

export default routes
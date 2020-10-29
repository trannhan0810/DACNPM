import { Router } from 'express'
import CategoryController from './controller'

/** @swagger
 * tags:
 *   name: Category
 *   description: API to manage your categories.
 */

const routes = Router()
const categoryController = new CategoryController()

routes.get("/", categoryController.getMany.bind(categoryController))
/**
 * @swagger
 * path:
 *  /categories/:
 *    get:
 *      summary: Get all categories filter by conditional in params if have, else return all categories
 *      tags: [Category]
 *      parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: Return a list categories map the params.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:     
 *                  $ref: '#/components/schemas/Category'
 */ 


routes.get("/:id", categoryController.getById.bind(categoryController))
/**
 * @swagger
 * path:
 *  /categories/{id}/:
 *    get:
 *      summary: Get one category by id
 *      tags: [Category]
 *      responses:
 *        "200":
 *          description: Return one category.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category'
 */ 


routes.post("/", categoryController.createOne.bind(categoryController))
/**
 * @swagger
 * path:
 *  /categories/:
 *    post:
 *      summary: Create new category
 *      tags: [Category]
 *      requestBody:
 *        description: Optional description in *Markdown*
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategorySubmit'
 *      responses:
 *        "200":
 *          description: Return created category.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category'
 */ 


routes.delete("/:id", categoryController.deleteOne.bind(categoryController))
/**
 * @swagger
 * path:
 *  /categories/{id}/:
 *    delete:
 *      summary: Delete a category
 *      tags: [Category]
 *      responses:
 *        "200":
 *          description: Return delete info.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category'
 */ 


routes.put("/:id", categoryController.updateOne.bind(categoryController))
/**
 * @swagger
 * path:
 *  /categories/{id}/:
 *    put:
 *      summary: Update a category
 *      tags: [Category]
 *      requestBody:
 *        description: Optional description in *Markdown*
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategorySubmit'
 *      responses:
 *        "200":
 *          description: Return category before updated.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category'
 */ 

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        _id:
 *          type: string
 *          description: Auto-gen mongodb key
 *        name:
 *          type: string
 *          description: Category's name
 *      example:
 *        _id: 5f945a54ec925e046a5d4e92
 *        name: Laptop
 *    CategorySubmit:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: Category's name
 *      example:
 *        name: Laptop
 */

export default routes
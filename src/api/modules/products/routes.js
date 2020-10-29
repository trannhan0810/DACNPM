import { Router } from 'express'
import ProductController from './controller'

/** @swagger
 * tags:
 *   name: Product
 *   description: API to manage your brands.
 */

const routes = Router()
const productController = new ProductController()

routes.get("/", productController.getManyWithRelation.bind(productController))
/**
 * @swagger
 * path:
 *  /products/:
 *    get:
 *      summary: Get all products filter by condition in params
 *      tags: [Product]
 *      parameters:
 *      - in: path
 *        name: id_brand
 *        schema:
 *          type: string
 *      - in: path
 *        name: id_category
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: Return a list products map the params.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 */ 

routes.get("/:id", productController.getByIdWithRelation.bind(productController))
/**
 * @swagger
 * path:
 *  /products/{id}/:
 *    get:
 *      summary: Get one product by id
 *      tags: [Product]
 *      responses:
 *        "200":
 *          description: Return one product.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 */ 

routes.post("/", productController.createOne.bind(productController))
/**
 * @swagger
 * path:
 *  /products/:
 *    post:
 *      summary: Create new product
 *      tags: [Product]
 *      requestBody:
 *        description: Optional description in *Markdown*
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductSubmit'
 *      responses:
 *        "200":
 *          description: Return created product.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 */ 

routes.delete("/:id", productController.deleteOne.bind(productController))
/**
 * @swagger
 * path:
 *  /products/{id}/:
 *    delete:
 *      summary: Delete a product
 *      tags: [Product]
 *      responses:
 *        "200":
 *          description: Return delete info.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 */ 

routes.put("/:id", productController.updateOne.bind(productController))
/**
 * @swagger
 * path:
 *  /products/{id}/:
 *    put:
 *      summary: Update a product
 *      tags: [Product]
 *      requestBody:
 *        description: Optional description in *Markdown*
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductSubmit'
 *      responses:
 *        "200":
 *          description: Return product before updated.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 */ 


/**
 *  @swagger
 *  components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - name
 *        - id_brand
 *        - id_category
 *        - price
 *        - description
 *        - product_detail
 *      properties:
 *        _id:
 *          type: string
 *          description: Auto-gen mongodb key.
 *        name:
 *          type: string
 *          description: Product's name.
 *        id_brand:
 *          type: string
 *          description: Brand's id.
 *        id_category:
 *          type: string
 *          description: Category's id.
 *        price:
 *          type: number
 *          description: The product's price.
 *        sales_price:
 *          type: number
 *          description: The product's sales price
 *        quantity:
 *          type: number
 *          description: The amount of product in storage
 *        image:
 *          type: array
 *          description: List of product's image url
 *        description:
 *          type: string 
 *          description: Description of the product
 *        product_detail: 
 *          type: object
 *          description: List detail of he product
 *        brand:
 *          type: object
 *          properties:
 *            _id: 
 *              type: string
 *            name: 
 *              type: string
 *        category:
 *          type: object
 *          properties:
 *            _id: 
 *              type: string
 *            name:
 *              type: string
 *        create_at:
 *          type: string
 *          format: date
 *          description: The time this product created
 *      example:
 *        _id: 5f945a54ec925e046a5d4e92
 *        name: LAPTOP ACER NITRO 5 AN515-55-5923 (Core i5-10300H, Ram 8G, SSD 512GB, Màn hình 15.6 FHD 144Hz, VGA GTX1650Ti, WIN 0 Home 64)
 *        id_brand: 5f945a54ec925e046a5d4e92
 *        price: 22890000
 *        sales_price: 0
 *        quantity: 20
 *        id_category: 5f946291ec925e046a5d4e9c
 *        image: ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"]
 *        description: Thiết kế Laptop sở hữu thiết kế ấn tượng với hai màu đen-đỏ chủ đạo...
 *        product_detail: 
 *          Bộ vi xử lý: "Intel Core i5-10300H"
 *          Tốc độ: "2.50 GHz upto 4.50 GHz, 4 cores 8 threads"
 *          Bộ nhớ đệm: "8MB Cache"
 *        brand:
 *          _id: 5f945a54ec925e046a5d4e92
 *          name: Acer
 *        category:
 *          _id: 5f946291ec925e046a5d4e9c
 *          name: Laptop
 *        create_at: 2020-10-27T07:03:59.202Z
 *    ProductSubmit:
 *      type: object
 *      required:
 *        - name
 *        - id_brand
 *        - id_category
 *        - price
 *        - description
 *        - product_detail
 *      properties:
 *        name:
 *          type: string
 *          description: Product's name.
 *        id_brand:
 *          type: string
 *          description: Brand's id.
 *        id_category:
 *          type: string
 *          description: Category's id.
 *        price:
 *          type: number
 *          description: The product's price.
 *        sales_price:
 *          type: number
 *          description: The product's sales price
 *        quantity:
 *          type: number
 *          description: The amount of product in storage
 *        image:
 *          type: array
 *          description: List of product's image url
 *        description:
 *          type: string 
 *          description: Description of the product
 *        product_detail: 
 *          type: object
 *          description: List detail of he product
 *      example:
 *        name: LAPTOP ACER NITRO 5 AN515-55-5923 (Core i5-10300H, Ram 8G, SSD 512GB, Màn hình 15.6 FHD 144Hz, VGA GTX1650Ti, WIN 0 Home 64)
 *        id_brand: 5f945a54ec925e046a5d4e92
 *        price: 22890000
 *        sales_price: 0
 *        quantity: 20
 *        id_category: 5f946291ec925e046a5d4e9c
 *        image: ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"]
 *        description: Thiết kế Laptop sở hữu thiết kế ấn tượng với hai màu đen-đỏ chủ đạo...
 *        product_detail: 
 *          Bộ vi xử lý: "Intel Core i5-10300H"
 *          Tốc độ: "2.50 GHz upto 4.50 GHz, 4 cores 8 threads"
 *          Bộ nhớ đệm: "8MB Cache"
 *        create_at: 2020-10-27T07:03:59.202Z
 */
export default routes
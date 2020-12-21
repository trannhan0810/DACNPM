import { override } from 'joi';
import Controller from '../../core/Controller'
import OrderService from './service';
import ProductService from '../products/service'
export default class OrderController extends Controller{

    service = OrderService.getService();
    productService  = ProductService.getService();
    constructor() {
        super(OrderService.getService());
    }

    async createItem(payload){
        return await this.service.createItem(payload)
    }
    
    async createOne(req, res){
        const data = req.body;
    
        let order = await this.service.createOne(data)
        console.log("New Order :   ")
        console.log(order)
        const {items} = req.body
        // let id_order = {"id_order" : order.id}
        console.log(typeof(items))
        let check = true;
        for(let i = 0; i< items.length; i++){
            let product = await this.productService.getById(items[i]["id_product"])
            if(product["quantity"] < items[i]["quantity"]){
                check =  false
            }
        }
        if(check){
            try {
                for(let i = 0; i< items.length; i++){
                    
                    items[i]["id_order"] = order.id
                    
                    let product = await this.productService.getById(items[i]["id_product"])
                    
                    product["quantity"] = product["quantity"] - items[i]["quantity"]
                    let update_quantity = {"quantity" : product["quantity"]}
                    await this.productService.updateOne(product.id, update_quantity)
                    items[i]["price"] = product["price"]* items[i]["quantity"]
                    console.log(product)
                    this.service.createItem(items[i])
                }   
                order = {
                    ...order['_doc'], items
                }
                res.send(order)     
            }    
            catch (error) {
                res.status(404).send("Not found")
            }
        }else{
            res.status(400).send("Invalid Quantity")
        }
    }
}
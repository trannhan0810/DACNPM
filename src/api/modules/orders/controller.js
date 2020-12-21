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
        
        for(let i = 0; i< items.length; i++){

            items[i]["id_order"] = order.id
            
            let product = await this.productService.getById(items[i]["id_product"])
            items[i]["price"] = product["price"]* items[i]["quantity"]
            console.log(product)
            this.service.createItem(items[i])
        }
        order = {
            ...order['_doc'], items
        }
        res.send(order)
    }
}
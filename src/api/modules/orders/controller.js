import { override } from 'joi';
import Controller from '../../core/Controller'
import OrderService from './service';
import ProductService from '../products/service'
import OrderItemService from '../order_item/service'
import UserService from '../users/service'
import ShippingOrderService from '../shipping_order/service'
var mongoose = require('mongoose');
export default class OrderController extends Controller{

    service = OrderService.getService();
    productService  = ProductService.getService();
    orderItemService = OrderItemService.getService();
    userService = UserService.getService();
    shippingOrderService = ShippingOrderService.getService();
    constructor() {
        super(OrderService.getService());
    }

    async createItem(payload){
        return await this.service.createItem(payload)
    }
    
    async createOne(req, res){
        const data = req.body;
    
        const {items} = req.body
       
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
                let order = await this.service.createOne(data)
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

    async getOrderbyUserId(req, res){
        const user_id = req.body.id_user
        console.log(user_id)
        let id = mongoose.Types.ObjectId(user_id)
        console.log(id)
        let query  = {"id_user" : id}
        let orders = await this.service.getMany(query)
        let result = await Promise.all(
            orders.map(async order => {
                const id = {"id_order" : order.id}
                
                let orderItem = await this.orderItemService.getMany(id)
                
                let result2 = await Promise.all(
                    orderItem.map(async item =>{
                        let product = await this.productService.getById(item["id_product"])
                        item = item["_doc"]
                        Object.assign(item, {"product_name" : product["name"]})
                        return item
                    })
                )
                orderItem = result2
                order = order["_doc"]
                return {
                    ...order, orderItem
                }
            },
        ))
        // console.log(result)
        res.send(result)
        
    }
    
    async getFullOrder(req, res){
        const orders = await this.service.getMany()
        let result = await Promise.all(
            orders.map(async order => {
                const id = {"id_order" : order.id}
                // const id_user = {"id" : order.id_user}
                // console.log(id_user)
                let orderItem = await this.orderItemService.getMany(id)
                let user = await this.userService.getOne(order.id_user)
                console.log(user)
                let result2 = await Promise.all(
                    orderItem.map(async item =>{
                        let product = await this.productService.getById(item["id_product"])
                        item = item["_doc"]
                        Object.assign(item, {"product_name" : product["name"]})
                        return item
                    })
                )
                orderItem = result2
                order = order["_doc"]
                Object.assign(order, {"userName" : user.name})
                return {
                    ...order, orderItem
                }
            },
        ))
        // console.log(result)
        res.send(result)
    }

    async stateSubmitted(req, res){
        const state = req.params.state
        console.log(state)
        const status = {"status" : state}
        const orders = await this.service.getMany(status)
        let result = await Promise.all(
            orders.map(async order => {
                const id = {"id_order" : order.id}
                // const id_user = {"id" : order.id_user}
                // console.log(id_user)
                let orderItem = await this.orderItemService.getMany(id)
                let user = await this.userService.getOne(order.id_user)
                console.log(user)
                let result2 = await Promise.all(
                    orderItem.map(async item =>{
                        let product = await this.productService.getById(item["id_product"])
                        item = item["_doc"]
                        Object.assign(item, {"product_name" : product["name"]})
                        return item
                    })
                )
                orderItem = result2
                order = order["_doc"]
                Object.assign(order, {"userName" : user.name})
                return {
                    ...order, orderItem
                }
            },
        ))
        console.log(result)
        res.send(result)
    }

    async getOrderShipping(req, res){
        const shipper_id = req.params.id
        const orderTakens = await this.shippingOrderService.getMany({$or : [{id_shipper : shipper_id, status : "isTaken"}, {id_shipper : shipper_id, status : "Success"}]})
        
        const status = {"status" : "Shipping"}
        try {
            const orders = await this.service.getMany(status)
            
            let result = await Promise.all(
                orders.map(async order => {
                    order = order["_doc"]
                    Object.assign(order, {"id_shipper" : ""})
                    Object.assign(order, {"id_order" : order["_id"]})
                    return order
                }))
            console.log(result)
            if(orders.length!=0){
                console.log("yup")
                Array.prototype.push.apply(result, orderTakens); 
                
                res.status(200).send(result)
            }else{
                if(orderTakens.length!=0){
                    res.status(200).send(orderTakens)
                }else
                    res.status(200).send("No Order need to ship")
            }
        } catch (error) {
            res.status(404).send("Not found")
        }
        
    }

    async getOrderSubmitted(req, res){
        const status = {"status" : "Submitted"}
        try {
            const orders = await this.service.getMany(status)
            if(orders.length!=0){
                res.status(200).send(orders)
            }else{
                res.status(200).send("No Order need to process")
            }
        } catch (error) {
            res.status(404).send("Not found")
        }
        
    }

    async getOrderProcessing(req, res){
        const status = {"status" : "Processing"}
        try {
            const orders = await this.service.getMany(status)
            if(orders.length!=0){
                res.status(200).send(orders)
            }else{
                res.status(200).send("No Order need to process")
            }
        } catch (error) {
            res.status(404).send("Not found")
        }
    }

    async cancelOrder(req, res){
        const order_id = req.params.id
        console.log(order_id)
        
        const order = await this.service.updateOne(order_id, {"status" : "Cancel"})
        console.log(order)
        const orderItem = await this.orderItemService.getMany({"id_order" : order.id})
        for(let i =0; i < orderItem.length; i++)
        {
            orderItem[i]["id_order"] = order.id                   
            let product = await this.productService.getById(orderItem[i]["id_product"])                  
            console.log(product["quantity"])
            console.log(orderItem[i]["quantity"])
            product["quantity"] = product["quantity"] + orderItem[i]["quantity"]
            await this.productService.updateOne(product.id, {"quantity" : product["quantity"]})         
        }
        const afterOrder = await this.service.getOne({"_id" : order_id})
        
        res.send(afterOrder)
    }

    async changeStatus(req, res){
        const order_id = req.params.id
        const status = req.query.status
        console.log(status)
        let order = await this.service.getOne({"_id" : order_id})
        console.log(order)
        await this.service.updateOne(order_id, {"status" : status})
        order = await this.service.getOne({"_id" : order_id})
        res.send(order)
    }

    async takenOrder(req, res){
        const order_id = req.params.id
        const shipper_id = req.body.user_id
        let order = await this.service.getOne({"_id" : order_id})
        
        if(order.status == "Shipping"){
            let shipper = await this.userService.getOne({"_id" : shipper_id})

            await this.service.updateOne(order_id, {"status" : "isTaken"})
            const shipperOrder = {
                "id_shipper" : shipper_id,
                "id_order" : order_id,
                "id_user" : order.id_user,
                "customer_phone" : order.customer_phone,  
                "totalPrice" : order.totalPrice,
            }
            let orderShip = await this.shippingOrderService.createOne(shipperOrder)
            res.send(orderShip);
        }
    }

    async orderSuccess(req, res){
        const order_id = req.params.id
        let shippingOrder = await this.shippingOrderService.getOne({"id_order" : order_id})
        const status = {"status" : "Success"}
        await this.shippingOrderService.updateOne(shippingOrder.id, status)
        await this.service.updateOne(order_id, status)
        res.send("Done")
    } 

    async getStateShippingOrder(req, res){
        console.log("NOOO")
        const orders = await this.service.getMany({$or : [{"status" : "isTaken"}, {"status" : "Success"}, {"status" : "Complete"}]})
        let result = await Promise.all(
            orders.map(async order => {
                const id = {"id_order" : order.id}
                // const id_user = {"id" : order.id_user}
                // console.log(id_user)
                let orderItem = await this.orderItemService.getMany(id)
                let user = await this.userService.getOne(order.id_user)
                let shippingOrder = await this.shippingOrderService.getOne(id)
                console.log(shippingOrder)
        
                let result2 = await Promise.all(
                    orderItem.map(async item =>{
                        let product = await this.productService.getById(item["id_product"])
                        item = item["_doc"]
                        Object.assign(item, {"product_name" : product["name"]})
                        
                        return item
                    })
                )
                orderItem = result2
                order = order["_doc"]
                Object.assign(order, {"Customer's Name" : user.name})
                
                
                
                let shipper = await this.userService.getOne({"_id" : shippingOrder["id_shipper"]})
                Object.assign(order, {"Shipper's Name" : shipper.name})
                Object.assign(order, {"Shipper's username" : shipper.userName})
                return {
                    ...order, orderItem
                }
            },
        ))
        res.status(200).send(result)
        
    }

    async statisticsRevenue(req, res){
        let {time_from} = req.body
        let {time_to} = req.body 
        let time_gt = new Date(time_from)
        // console.log(time_gt)
        // let time_convert = time_gt.getFullYear() + "-" + (time_gt.getMonth()+1) + "-" + (time_gt.getDate()+1)
        let time_lt = new Date(time_to)
        // console.log(time_convert)
        
        const orders = await this.service.getMany({create_at:{
            $gte: time_gt,
            $lt: time_lt
        }})
        let revenue = 0
        orders.forEach(order => {
            revenue  += order.totalPrice
        });
        let money_get = 0
        orders.forEach(order => {
            if(order.status == "Complete"){
                money_get += order.totalPrice
            }
        });
       
        let result = await Promise.all(
            orders.map(async order => {
                const id = {"id_order" : order.id}
                
                let orderItem = await this.orderItemService.getMany(id)
                
                let result2 = await Promise.all(
                    orderItem.map(async item =>{
                        let product = await this.productService.getById(item["id_product"])
                        item = item["_doc"]
                        Object.assign(item, {"product_name" : product["name"]})
                        return item
                    })
                )
                orderItem = result2
                order = order["_doc"]
                return {
                    ...order, orderItem
                }
            },
        ))
        let data = {
            "order" : result,
            "revenue" : revenue,
            "money_get" : money_get
        }
        res.send(data)
    }

    async deleteOrderFromUser(req, res){
        const order_id = req.params.id
        const order = await this.service.getOne({"_id":order_id})
        if(order.status == "Submitted" | order.status == "Processing"){
            let newStatus = "Cancel"
            await this.service.updateOne(order_id, {"status" : newStatus})
            res.status(200).send(await this.service.getOne({"_id":order_id}))
        }else{
            res.status(403).send("Sorry, you can not cancel your order now. It's on the way to your location")
        }
    }

    async deleteOrderFromShop(req, res){
        const order_id = req.params.id
        const order = await this.service.getOne({"_id":order_id})
        let newStatus = "Cancel"
        await this.service.updateOne(order_id, {"status" : newStatus})
        res.status(200).send(await this.service.getOne({"_id":order_id}))
    }

    async getShipperTakeOrder(req, res){
        const orders = await this.shippingOrderService.getMany({$or : [{"status" : "isTaken"}, {"status" : "Success"}]})
        res.status(400).send(orders)
    }
}
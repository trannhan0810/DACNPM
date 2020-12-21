import Repository from '../../core/Repository'
import Order from "../../../database/schemas/Order"
import OrderItem from "../../../database/schemas/Order_Item"
export default class OrderRepository extends Repository {

    static instance;

    constructor(model) {
        super(model)
    }

    static getRepository()
    {
        if(OrderRepository.instance == null)
        {
            OrderRepository.instance = new OrderRepository(Order)
        }
        return OrderRepository.instance
    }

    createItem(payload){
        OrderItem.create(payload)
    }

}

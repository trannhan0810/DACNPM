import Repository from '../../core/Repository'
import OrderItem from "../../../database/schemas/Order_Item"

export default class OrderItemRepository extends Repository {

    static instance;

    constructor(model) {
        super(model)
    }


    static getRepository()
    {
        if(OrderItemRepository.instance == null)
        {
            OrderItemRepository.instance = new OrderItemRepository(OrderItem)
        }
        return OrderItemRepository.instance
    }
}

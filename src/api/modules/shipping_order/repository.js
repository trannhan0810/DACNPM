import Repository from '../../core/Repository'
import ShippingOrder from "../../../database/schemas/Shipping_Order"

export default class ShippingOrderRepository extends Repository {

    static instance;

    constructor(model) {
        super(model)
    }


    static getRepository()
    {
        if(ShippingOrderRepository.instance == null)
        {
            ShippingOrderRepository.instance = new ShippingOrderRepository(ShippingOrder)
        }
        return ShippingOrderRepository.instance
    }

    
}

import Service from '../../core/Service'
import ShippingOrderRepository from './repository'

export default class ShippingOrderService extends Service{
    static instance;
  
    static getService() {
        if(!ShippingOrderService.instance)
        {
            ShippingOrderService.instance = new ShippingOrderService(ShippingOrderRepository.getRepository())
        }
        return ShippingOrderService.instance
    }
    
}
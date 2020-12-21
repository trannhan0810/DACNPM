import Service from '../../core/Service'
import OrderItemRepository from './repository'

export default class OrderItemService extends Service{
    static instance;
  
    static getService() {
        if(!OrderItemService.instance)
        {
            OrderItemService.instance = new OrderItemService(OrderItemRepository.getRepository())
        }
        return OrderItemService.instance
    }
    
}
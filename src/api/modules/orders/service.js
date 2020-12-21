import Service from '../../core/Service'
import OrderRepository from './repository'

export default class OrderService extends Service{
    static instance;
  
    static getService() {
        if(!OrderService.instance)
        {
            OrderService.instance = new OrderService(OrderRepository.getRepository())
        }
        return OrderService.instance
    }

    createItem(payload){
        return this.repository.createItem(payload)
    }
    
}
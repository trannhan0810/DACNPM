import Controller from '../../core/Controller'
import OrderItemService from './service';

 
export default class OrderItemController extends Controller{

    service = OrderItemService.getService();

    constructor() {
        super(OrderItemService.getService());
    }
   
}
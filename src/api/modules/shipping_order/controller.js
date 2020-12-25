import Controller from '../../core/Controller'
import ShippingOrderService from './service';

 
export default class ShippingOrderController extends Controller{

    service = ShippingOrderService.getService();

    constructor() {
        super(ShippingOrderService.getService());
    }
    
    
}
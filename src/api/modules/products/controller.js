import Controller from '../../core/Controller'
import ProductService from './service';

export default class ProductController extends Controller{

    service = ProductService.getService();

    constructor() {
        super(ProductService.getService());
    }
   
}
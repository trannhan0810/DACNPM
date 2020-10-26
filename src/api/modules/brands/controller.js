import Controller from '../../core/Controller'
import BrandService from './service';
import UserService from "./service"
 
export default class BrandController extends Controller{

    service = BrandService.getService();

    constructor() {
        super(BrandService.getService());
    }
   
}
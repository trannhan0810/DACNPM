import Controller from '../../core/Controller'
import BrandService from './service';
 
export default class BrandController extends Controller{

    service = BrandService.getService();

    constructor() {
        super(BrandService.getService());
    }
   
}
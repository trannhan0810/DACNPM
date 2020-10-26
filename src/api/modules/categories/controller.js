import Controller from '../../core/Controller'
import CategoryService from './service';

export default class CategoryController extends Controller{

    service = CategoryService.getService();

    constructor() {
        super(CategoryService.getService());
    }
   
}
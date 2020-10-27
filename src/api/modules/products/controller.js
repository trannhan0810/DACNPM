import Controller from '../../core/Controller'
import ProductService from './service';

export default class ProductController extends Controller{

    service = ProductService.getService();

    constructor() {
        super(ProductService.getService());
    }
   
    async getManyWithRelation(req, res) {
        const condition = req.body
        res.send(await this.service.getManyWithRelation(condition));
    }
}
import Controller from '../../core/Controller'
import ProductService from './service';

export default class ProductController extends Controller{

    service = ProductService.getService();

    constructor() {
        super(ProductService.getService());
    }
   
    async getByIDWithRelation(req, res) {
        const { id } = req.param 
        res.send(await this.service.getByIDWithRelation(id));
    }

    async getManyWithRelation(req, res) {
        const condition = req.query
        res.send(await this.service.getManyWithRelation(condition));
    }
}
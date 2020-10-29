import Controller from '../../core/Controller'
import ProductService from './service';

export default class ProductController extends Controller{

    service = ProductService.getService();

    constructor() {
        super(ProductService.getService());
    }
   
    async getByIdWithRelation(req, res) {
        const { id } = req.params 
        res.send(await this.service.getByIdWithRelation(id));
    }

    async getManyWithRelation(req, res) {
        const condition = req.query
        res.send(await this.service.getManyWithRelation(condition));
    }
}
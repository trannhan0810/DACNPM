import Controller from '../../core/Controller'
import ProductService from './service';
import _ from 'lodash'

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
        const condition = _.omit(req.query, 'limit')
        const result = await this.service.getManyWithRelation(condition)
        const limit = req.query.limit||result.length
        res.send(result.slice(0,limit))
    }
}
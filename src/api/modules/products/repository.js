import Repository from '../../core/Repository'
import Product from "../../../database/schemas/Product"

export default class ProductRepository extends Repository {

    static instance;

    constructor(model) {
        super(model)
    }


    static getRepository()
    {
        if(ProductRepository.instance == null)
        {
            ProductRepository.instance = new ProductRepository(Product)
        }
        return ProductRepository.instance
    }
    
    getManyWithRelation(condition = {}, column = []) {
        return this.model.find(condition).populate('brand').populate('category');
    }
}

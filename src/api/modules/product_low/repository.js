import Repository from '../../core/Repository'
import ProductLow from "../../../database/schemas/Product_Low"

export default class ProductLowRepository extends Repository {

    static instance;

    constructor(model) {
        super(model)
    }


    static getRepository()
    {
        if(ProductLowRepository.instance == null)
        {
            ProductLowRepository.instance = new ProductLowRepository(ProductLow)
        }
        return ProductLowRepository.instance
    }
    
    getByIdWithRelation(id, column = []) { 
        return this.model.findById(id).populate('brand').populate('category');
    }

    getManyWithRelation(condition = {}, column = []) {
        return this.model.find(condition).populate('brand').populate('category');
    }
}

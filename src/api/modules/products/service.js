import Service from '../../core/Service'
import ProductRepository from './repository'

export default class ProductService extends Service{
    static instance;
  
    static getService() {
        if(!ProductService.instance)
        {
            ProductService.instance = new ProductService(ProductRepository.getRepository())
        }
        return ProductService.instance
    }
    
    async getByIdWithRelation(id, column = []) {
        try {
            return await this.repository.getByIdWithRelation(id, column);
        } catch(err) {
        }
    }

    async getManyWithRelation(condition = {}, column = []) {
        try {
            return await this.repository.getManyWithRelation(condition, column);
        } catch {

        }
    }

    
}
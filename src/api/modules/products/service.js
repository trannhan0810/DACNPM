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
    
    async getManyWithRelation(condition = {}, column = []) {
        return await this.repository.getManyWithRelation(condition = {}, column = []);
    }
}
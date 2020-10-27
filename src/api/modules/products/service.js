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
    
    async getByIDWithRelation(id, column = []) {
        try {
            return await this.repository.getByIDWithRelation(id, column = []);
        } catch {
            
        }
    }

    async getManyWithRelation(condition = {}, column = []) {
        try {
            return await this.repository.getManyWithRelation(condition = {}, column = []);
        } catch {

        }
    }
}
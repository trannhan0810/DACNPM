import Service from '../../core/Service'
import ProductLowRepository from './repository'

export default class ProductLowService extends Service{
    static instance;
  
    static getService() {
        if(!ProductLowService.instance)
        {
            ProductLowService.instance = new ProductLowService(ProductLowRepository.getRepository())
        }
        return ProductLowService.instance
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
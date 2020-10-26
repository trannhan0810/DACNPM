import Service from '../../core/Service'
import BrandRepository from './repository'

export default class BrandService extends Service{
    static instance;
  
    static getService() {
        if(!BrandService.instance)
        {
            BrandService.instance = new BrandService(BrandRepository.getRepository())
        }
        return BrandService.instance
    }
    
}
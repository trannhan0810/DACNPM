import Service from '../../core/Service'
import CategoryRepository from './repository'

export default class CategoryService extends Service{
    static instance;
  
    static getService() {
        if(!CategoryService.instance)
        {
            CategoryService.instance = new CategoryService(CategoryRepository.getRepository())
        }
        return CategoryService.instance
    }
    
}
import Service from '../../core/Service'
import RoleRepository from "./repository"

export default class RoleService extends Service{
    static instance;
  
    static getService() {
        if(!RoleService.instance)
        {
            RoleService.instance = new RoleService(RoleRepository.getRepository())
        }
        return RoleService.instance
    }
    
}
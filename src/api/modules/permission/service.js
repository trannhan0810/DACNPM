import Service from '../../core/Service'
import PermissionRepository from "./repository"

export default class PermissionService extends Service{
    static instance;
  
    static getService() {
        if(!PermissionService.instance)
        {
            PermissionService.instance = new PermissionService(PermissionRepository.getRepository())
        }
        return PermissionService.instance
    }
    
}
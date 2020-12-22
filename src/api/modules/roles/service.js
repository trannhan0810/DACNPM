import Service from '../../core/Service'
import PermissionRepository from '../permission/repository';
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

    async getAllRoleAndPermiss() {
        
        var roles = []
        try {
            roles = await this.repository.getMany()
            return await Promise.all(roles.map(async (role)=>{
                let permissions = await this.repository.getPermission(role.id)
                return {
                    name: role.name,
                    permissions: permissions 
                }   
            }))
        } catch {
            return []
        }
    }
    
}
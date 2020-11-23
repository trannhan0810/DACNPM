import Service from '../../core/Service'
import UserRepository from "./repository"

export default class UserService extends Service{
    static instance;
  
    static getService() {
        if(!UserService.instance)
        {
            UserService.instance = new UserService(UserRepository.getRepository())
        }
        return UserService.instance
    }
    async Register(payload){
        try { 
            return await this.repository.Register(payload)
        } catch {
            
        }
    }

    async Login(payload){
        try { 
            return await this.repository.Login(payload)
        } catch {
            
        }

    }
    
}
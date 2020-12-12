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
    
}
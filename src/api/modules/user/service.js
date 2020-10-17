import UserRepository from "./repository"

export default class UserService{
    static instance;
    constructor(){
        this.repository = UserRepository.getRepository();
    }
    static getService() {
        if(!UserService.instance)
        {
            UserService.instance = new UserService()
        }
        return UserService.instance
    }
    getMany() {
        return this.repository.getMany()
    }
}
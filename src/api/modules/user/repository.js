import Repository from '../../core/Repository'
import User from "../../../database/schemas/User"

export default class UserRepository extends Repository {

    static instance;

    constructor(model) {
        super(model)
    }


    static getRepository()
    {
        if(UserRepository.instance == null)
        {
            UserRepository.instance = new UserRepository(User)
        }
        return UserRepository.instance
    }

    Register(payload) {
        return this.model.create(payload)
    } 

    Login(condition = {}, column = []) {
        return this.model.findOne(condition).select(column)
    }
    
}

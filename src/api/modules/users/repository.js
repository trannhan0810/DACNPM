import Repository from '../../core/Repository'
import User from "../../../database/schemas/User"
import { values } from 'lodash';

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

    getById(id, column = []) {
        let user = this.model.findById(id).select(column)
        user.populate("id_role")
        return user
    } 
}

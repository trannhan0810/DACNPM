import UserService from "./service";
import User from "../../../database/schemas/User"
export default class UserRepository{
    static instance;
    static getRepository()
    {
        if(!UserRepository.instance)
        {
            UserRepository.instance = new UserRepository()
        }
        return UserRepository.instance
    }
    getMany()
    {
        return User.find()
    }
}

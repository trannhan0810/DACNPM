import Repository from '../../core/Repository'
import User from "../../../database/schemas/User"
import Role from "../../../database/schemas/Role"
import Permiss_Detail from '../../../database/schemas/Permiss_Detail';
import Permission from '../../../database/schemas/Permission';
import Authorization from '../../../database/schemas/Authorization';

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
    
    async getPermission(id) {
        const user = await this.model.findById(id)
        const id_role = user.id_role
        const ids_permission = await Permiss_Detail.find({'id_role': id_role})
        const permissions = await Permission.find({'_id': { $in: ids_permission}})
        return permissions
    }

    async getRoutePermission(api_path, api_method) {
        return Authorization.findOne({api_path: api_path, api_method: api_method}).select("id_per")
    }

}

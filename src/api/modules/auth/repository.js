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
    
    async getUserPermiss(id) {
        const user = await this.model.findById(id)
        const id_role = user.id_role
        const permiss_details = await Permiss_Detail.find({'id_role': id_role}).select("id_per")
        const permissions = permiss_details.map((permiss_detail) => permiss_detail.id_per)
        return permissions
    }

    async getRoutePermiss(api_path, api_method) {
        const permiss = await Authorization.findOne({api_path: api_path, api_method: api_method}).select("id_per")
        return permiss.id_per
    }

    async getAuths() {
        const auths = await Authorization.find({})
        return Promise.all(auths.map(async (auth)=>{
            let permiss = await Permission.findById(auth.id_per)
            let authObj = auth.toObject()
            authObj.permiss = permiss
            return authObj
        }))
    }
}

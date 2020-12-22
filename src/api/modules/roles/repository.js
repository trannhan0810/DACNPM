import Repository from '../../core/Repository'
import Role from "../../../database/schemas/Role"
import Permiss_Detail from '../../../database/schemas/Permiss_Detail';
import Permission from '../../../database/schemas/Permission';


export default class RoleRepository extends Repository {

    static instance;

    constructor(model) {
        super(model)
    }


    static getRepository()
    {
        if(RoleRepository.instance == null)
        {
            RoleRepository.instance = new RoleRepository(Role)
        }
        return RoleRepository.instance
    }

    async getPermission(id) {
        const ids_permiss = await Permiss_Detail.find({id_role: id})
        return Promise.all(ids_permiss.map((value) => {
            return Permission.findById(value.id_per)
        }))
    }
}

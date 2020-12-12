import Repository from '../../core/Repository'
import Role from "../../../database/schemas/Role"

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
}

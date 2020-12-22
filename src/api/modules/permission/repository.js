import Repository from '../../core/Repository'
import Permission from "../../../database/schemas/Permission"

export default class PermissionRepository extends Repository {

    static instance;

    constructor(model) {
        super(model)
    }


    static getRepository()
    {
        if(PermissionRepository.instance == null)
        {
            PermissionRepository.instance = new PermissionRepository(Permission)
        }
        return PermissionRepository.instance
    }
}

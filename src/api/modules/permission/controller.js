import Controller from '../../core/Controller'
import RoleService from "./service"
export default class RoleController extends Controller{

    service = RoleService.getService();

    constructor() {
        super(RoleService.getService());
    }

}

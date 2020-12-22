import Controller from '../../core/Controller'
import PermissionService from "./service"
export default class PermissionController extends Controller{

    service = PermissionService.getService();

    constructor() {
        super(PermissionService.getService());
    }

}

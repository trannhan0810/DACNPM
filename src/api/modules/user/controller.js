import Controller from '../../core/Controller'
import UserService from "./service"
 
export default class UserController extends Controller{

    service = UserService.getService();

    constructor() {
        super(UserService.getService());
    }
   
}
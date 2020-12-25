import Controller from '../../core/Controller'
import AuthService from "./service"

export default class AuthController extends Controller{

    service = AuthService.getService();

    constructor() {
        super(AuthService.getService());
    }

    async Register(req, res) { 
        const payload = req.body;    
        res.send(await this.service.registry(payload))      
    }

    async Login(req, res) {
        const payload = req.body
        res.send(await this.service.login(payload))
    }

    async getMe(req, res) {
        const id = req.user.id
        res.send(await this.service.getMe(id))
    } 
}



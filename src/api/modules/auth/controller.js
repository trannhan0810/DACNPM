import Controller from '../../core/Controller'
import AuthService from "./service"
import jwt from 'jsonwebtoken'
import UserService from '../users/service';
import Boom from '@hapi/boom'

export default class AuthController extends Controller{

    service = AuthService.getService();

    constructor() {
        super(AuthService.getService());
    }

    async Register(req, res, next) { 
        const payload = req.body;    
        res.send(await this.service.registry(payload))      
    }

    async Login(req, res, next) {
        const payload = req.body
        res.send(await this.service.login(payload))
    }

    async getMe(req, res, next) {
        const id = req.user.id
        res.send(await this.service.getMe(id))
    } 
}

export let  authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token  =  authHeader && authHeader.split(' ')[1]
    if(token == null) throw Boom.unauthorized()
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if(err) next(Boom.unauthorized("Wrong acess token"))
        req.user = user;
    })  
    if(req.user != null) {
        const id = req.user.id
        const api_path = req.baseUrl + req.route.path
        const api_method = req.method
        const haveAuthor = await AuthService.getService().authorize(id, api_path, api_method)
        if(haveAuthor == false) throw Boom.forbidden()
        next() 
    }
    
    
   
}

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

    async getAuths(req, res, next) {
        res.send(await this.service.getAuths())
    }
}

export let  authenticateToken = async (req, res, next) => {
    
    const api_path = req.baseUrl + req.route.path
    const api_method = req.method
    const routePermission = await AuthService.getService().getRoutePermiss(api_path, api_method)
    
    console.log(api_path) 
    console.log(api_method) 
    console.log(routePermission) 

    if(routePermission == null) next()

    const authHeader = req.headers['authorization']
    const token  =  authHeader && authHeader.split(' ')[1]
    if(token == null) throw Boom.unauthorized()
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if(err) next(Boom.unauthorized("Wrong acess token"))
        req.user = user;
        const userPermission = await AuthService.getService().getUserPermiss(user.id)
        console.log(userPermission) 
        
        if(userPermission.some(element => JSON.stringify(element) === JSON.stringify(routePermission))) next()
        else next(Boom.unauthorized("Not have pemission"))
    })
}

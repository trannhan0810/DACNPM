import Controller from '../../core/Controller'
import AuthService from "./service"
import jwt from 'jsonwebtoken'
import UserService from '../users/service';

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
        const username = req.user.username
        res.send(await this.service.getMe(username))
    } 
}

export let authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token  =  authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user;
        console.log("username: " + req.user.username)
        console.log("api_path: " + req.baseUrl + req.route.path)
        console.log("api_method: " + req.method)
        next() 
    })  
}

import Controller from '../../core/Controller'
import AuthService from "./service"
import jwt from 'jsonwebtoken'

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
}

export let authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token  =  authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user;
        console.log(user)
        console.log(req.baseUrl + req.route.path)
        next() 
    })  
}

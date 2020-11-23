import { removeAllListeners } from 'nodemon';
import User from '../../../database/schemas/User';
import Controller from '../../core/Controller'
import UserService from "./service"
const Joi = require('joi')
const jwt = require('jsonwebtoken')
export default class UserController extends Controller{

    service = UserService.getService();

    constructor() {
        super(UserService.getService());
    }
    async Register(req, res) {
        const user = new User({
            name: req.body.name,
            username : req.body.username,
            password: req.body.password,
            
        });
        try{
            const savedUser = await this.service.Register(user)
            console.log("ABC")
            res.send(savedUser)
            
        }catch(err)
        {
            res.status(404).send(err);
        }
   
    }

    async Login(req, res) {
        const username = req.body.username
        const user = {name : username}
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.send({accessToken : accessToken})

    }
    authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token  =  authHeader && authHeader.split(' ')[1]
        if(token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user))
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    }
}

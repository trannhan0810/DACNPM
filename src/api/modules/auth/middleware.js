import jwt from 'jsonwebtoken'
import Boom from '@hapi/boom'
import AuthService from "./service"

export default async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token  =  authHeader && authHeader.split(' ')[1]
    if(token == null) throw Boom.unauthorized()
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if(err) next(Boom.unauthorized("Wrong acess token"))
        req.user = user;
        const api_path = req.baseUrl + req.route.path
        const api_method = req.method
        const haveAuthor = await AuthService.getService().authorize(user.id, api_path, api_method)
        if(haveAuthor == false) next(Boom.forbidden("Not have permission"))
        next() 
    })  
}
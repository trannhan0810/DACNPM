import jwt from 'jsonwebtoken'
import Boom from '@hapi/boom'
import AuthService from "./service"
import UserRepository from './repository'

export default async (req, res, next) => {
    const authHeader = req.headers['authorization']
    
    const api_path = req.baseUrl + req.route.path
    const api_method = req.method
    const userPermiss = await AuthService.getService().getUserPermission(user,id)
    const routePermiss = await AuthService.getService().getRoutePermission(api_path, api_method)
    if(routePermiss == null) next()
    else {
        const token  =  authHeader && authHeader.split(' ')[1]
        if(token == null) throw Boom.unauthorized()

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if(err) next(Boom.unauthorized("Wrong acess token"))
            req.user = user;
    
            
            if(userPermission.find((value)=>((String)(value.id_per)==(String)(routePermission.id_per))))  next()  
            else next(Boom.forbidden("Not have permission"))
        })  
    }
}
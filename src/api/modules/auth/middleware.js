import jwt from 'jsonwebtoken'
import Boom from '@hapi/boom'
import AuthService from "./service"
import UserRepository from './repository'

export default async (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token  =  authHeader && authHeader.split(' ')[1]
    if(token == null) throw Boom.unauthorized()
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if(err) next(Boom.unauthorized("Wrong acess token"))
        req.user = user;
        const api_path = req.baseUrl + req.route.path
        const api_method = req.method
        const haveAuthor = await AuthService.getService().authorize(user.id, api_path, api_method)
        if(haveAuthor == false) next(Boom.forbidden("Not have permission"))
        next() 
    })  



    /*
    const authHeader = req.headers['authorization']
    
    const api_path = req.baseUrl + req.route.path
    const api_method = req.method
    
    const routePermiss = await AuthService.getService().getRoutePermission(api_path, api_method)
   
    const token  =  authHeader && authHeader.split(' ')[1]
    


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if(err) next(Boom.unauthorized("Wrong acess token"))
        req.user = user;
        console.log(user)
        if(routePermiss == null) next()
        if(token == null) throw Boom.unauthorized()
        const userPermiss = await AuthService.getService().getUserPermission(user.id)
        if(userPermiss.find((value)=>((String)(value.id_per)==(String)(routePermiss.id_per))))  next()  
        else next(Boom.forbidden("Not have permission"))
    })  //*/
    
}
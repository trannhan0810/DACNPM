
import Boom from '@hapi/boom';
import Service from '../../core/Service'
import UserRepository from "./repository"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import RoleService from '../roles/service';

const salt = 10;

export default class AuthService extends Service{
    static instance;
  
    static getService() {
        if(!AuthService.instance)
        {
            AuthService.instance = new AuthService(UserRepository.getRepository())
        }
        return AuthService.instance
    }
    
    roleService = RoleService.getService()

    async registry(payload){
        try{
            const { name, username, password} = payload          
            if ( name && username && password == null) throw Boom.badRequest("Some field is empty!")
             
            const isExsit = await this.repository.getOne({username: username})
            if ( isExsit ) throw Boom.conflict("Username is already exist")
            const  hashPassword = bcrypt.hashSync(password, salt)
            const user = { name, username, password:hashPassword} 
            const newUser = await this.repository.createOne(user);
            return newUser
        }catch(err)
        {
            throw err
        }
    }

    async login(payload){
        try { 
            console.log(payload)
            const { username, password } = payload
            if (username == null || username == "") throw Boom.badRequest("Username is empty")

            const user = await this.repository.getOne({username: username})
            console.log(user)
            if (!user) throw Boom.badRequest("Username not exist")

            console.log(bcrypt.hashSync(password, salt))
            if (!bcrypt.compareSync(password, user.password)) throw Boom.badRequest("Wrong password");

            const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET)
            return {accessToken : accessToken}
        } catch(err) {
            throw(err)
        }

    }

    async getMe(id) {
        try{
            if(id == null) throw Boom.unauthorized("missing id");
            var user = await this.repository.getById(id)
            const userObject = user.toObject();
            const role = await this.roleService.getById(userObject.id_role)
            userObject.role = role.name
            return userObject
        } catch {
            throw err
        }
    }
    
    async authorize(user_id, api_path, api_method) {
        const [userPermission, routePermission] = await Promise.all([
            this.repository.getUserPermission(user_id),
            this.repository.getRoutePermission(api_path, api_method)
        ])
        console.log([api_path, api_method])
        console.log([userPermission, routePermission])
        if(routePermission == null) return true;
        if(userPermission.find((value)=>((String)(value.id_per)==(String)(routePermission.id_per)))) return true
        
        return false;  
    }

    async getUserPermission(id) {
        try {
        return this.repository.getUserPermission(id)
        } catch (err) {
            console.log(err)
        }
    }

    async getRoutePermission(api_path, api_method) {
        try {
            return this.repository.getRoutePermission(api_path, api_method)
        } catch (err) {
            console.log(err)
        }
        
    }
}
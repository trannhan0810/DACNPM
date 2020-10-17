import UserService from "./service"
 
export default class UserController{
    constructor(){
        this.service = UserService.getService()
       
    }
    getMany = async (req, res)=> {
        const result = await this.service.getMany();
        return res.json(result)
    }
}
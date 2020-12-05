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

}

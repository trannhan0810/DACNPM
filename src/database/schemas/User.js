import mongoose from 'mongoose'
const Joi = require('joi')
const { Schema } = mongoose

const options = {
    versionKey: false
}

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        default: "Nguyen Van A"
    },
    username:{
        type:String,
        required:true
    }, 
    password: {
        type:String,
        required:true
    },
    created: { 
        type: Date,
        default: Date.now
    },
    
})

// UserSchema.methods.joiValidate = function(obj) {
// 	var schema = {
//         name: Joi.types.String().min(6).max(30).default("Nguyen Van B"),
// 		username: Joi.types.String().min(6).max(30).required(),
// 		password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
// 		created: Joi.types.Date(),
// 	}
// 	return Joi.validate(obj, schema);
// }
 
export default mongoose.model("users", UserSchema)
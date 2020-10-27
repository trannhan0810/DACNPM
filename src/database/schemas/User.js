import mongoose from 'mongoose'

const { Schema } = mongoose

const options = {
    versionKey: false
}

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    }, 
    password: {
        type:String,
        required:true
    }

})

export default mongoose.model("users", UserSchema)
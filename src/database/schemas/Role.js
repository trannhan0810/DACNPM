import mongoose from 'mongoose'
const Joi = require('joi')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const options = {
    versionKey: false
}

const RoleSchema = new Schema({
    name:       { type: String, required:true},
    created_at: { type: Date, default: Date.now },
}, options)
 
export default mongoose.model("roles", RoleSchema)
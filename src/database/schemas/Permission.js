import mongoose from 'mongoose'
const  { Schema } = mongoose;

const options = {
    versionKey: false
}

const PermissionSchema = new Schema({
    name:           { type: String, required: true },
}, options)

export default mongoose.model('Permission', PermissionSchema)

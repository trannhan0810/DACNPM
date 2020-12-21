import mongoose from 'mongoose'
const  { Schema } = mongoose;

const options = {
    versionKey: false
}

const AuthSchema = new Schema({
    id_per:         { type: String, required: true },
    api_path:       { type: String, required: true },
    api_method:     { type: String, required: true },
}, options)

export default mongoose.model('Authorization', AuthSchema)

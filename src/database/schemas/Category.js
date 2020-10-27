import mongoose from 'mongoose'
const  { Schema } = mongoose;

const options = {
    versionKey: false
}

var CategorySchema = new Schema({
    name:           { type: String, required: true }
}, options)

export default mongoose.model('Category', CategorySchema)

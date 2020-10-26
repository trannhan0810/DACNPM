import mongoose from 'mongoose'
const  { Schema } = mongoose;

var CategorySchema = new Schema({
    name:           { type: String, required: true }
})

export default mongoose.model('Category', CategorySchema)

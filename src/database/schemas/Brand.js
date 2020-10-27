import mongoose from 'mongoose'
const  { Schema } = mongoose;

const options = {
    versionKey: false
}

const BrandSchema = new Schema({
    name:           { type: String, required: true },
}, options)

export default mongoose.model('Brand', BrandSchema)

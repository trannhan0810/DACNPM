import mongoose from 'mongoose'

const  { Schema } = mongoose;
const  { ObjectId } = Schema.Types

const options = {
    versionKey: false
}

var ReviewSchema = new Schema({
    id_product:     { type: ObjectId, required: true },
    id_user:        { type: ObjectId, required: true },
    rating:         { type: Number, required: true },
    comment:        { type: String},
    create_at:      { type: Date, default: Date.now},
}, options)

export default mongoose.model('Review', ReviewSchema)

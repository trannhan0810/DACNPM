import mongoose from 'mongoose'

const  { Schema } = mongoose;
const  { ObjectId } = Schema.Types

const options = {
    versionKey: false
}

var OrderItemSchema = new Schema({
    id_order:       { type: ObjectId, required: true},
    id_product:     { type: ObjectId, required: true },
    quantity:       { type: Number, default: 1 },
    price:          { type: Number, required: true},
    color:          { type: String },
    create_at:      { type: Date, default: Date.now},
}, options)

export default mongoose.model('Order_Item', OrderItemSchema)

import mongoose from 'mongoose'

const  { Schema } = mongoose;

var ProductSchema = new Schema({
    name:           { type: String, required: true },
    id_brand: {type:mongoose.Schema.Types.ObjectId, required: true},
    price: {type: Number, required: true},
    sales_price: {type: Number, default:0},
    quatity: {type: Number, default: 20},
    id_category: {type:mongoose.Schema.Types.ObjectId, required: true},
    image:{type: Array},
    description: {type: String, required: true},
    product_detail: {type: Object, required: true},
    create_at:{type: Date, default: Date.now}
})

export default mongoose.model('Product', ProductSchema)

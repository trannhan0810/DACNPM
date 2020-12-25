import mongoose from 'mongoose'

const  { Schema } = mongoose;
const  { ObjectId } = Schema.Types

const options = {
    versionKey: false
}

var ShippingOrderSchema = new Schema({
    id_shipper:     { type: ObjectId, required: true},
    id_order:      { type: ObjectId , required : true},
    Money:          { type: Number, default: 0},
    id_user:        {type: ObjectId, required: true},
    customer_phone: {type: Number, required:true},
    status:         { type: String, default: "isTaken"},
    create_at:      { type: Date, default: Date.now},
}, options)

export default mongoose.model('Shipping_Order', ShippingOrderSchema)

import mongoose from 'mongoose'

const  { Schema } = mongoose;
const  { ObjectId } = Schema.Types

const options = {
    versionKey: false
}

var OrderSchema = new Schema({
    id_user:        { type: ObjectId, required: true },
    id_coupon:      { type: ObjectId },
    totalPrice:     { type: Number, required: true },
    customer_phone: { type: String },
    subTotalPrice:  { type: Number },
    status:         { type: String, default: "Submitted"},
    /**
     * Submitted
     * Processing
     * Cancelled
     * Shipped
     * Package Delayed (Đơn hàng lớn, vận chuyển lâu ....)
     * Delivered
     
     */
    create_at:      { type: Date, default: Date.now},
}, options)

export default mongoose.model('Order', OrderSchema)

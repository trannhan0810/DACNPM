import mongoose, { Mongoose } from 'mongoose'

const  { Schema } = mongoose;
const  { ObjectId } = Schema.Types

const options = {
    versionKey: false
}

var CouponProductSchema = new Schema({
    id_product:     { type: ObjectId, required: true },
    id_coupon:      { type: ObjectId, required: true}
}, options)

export default mongoose.model('Coupon_Product', CouponProductSchema)

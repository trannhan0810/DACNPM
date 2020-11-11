import mongoose from 'mongoose'
const  { Schema } = mongoose;

const options = {
    versionKey: false
}

var CouponSchema = new Schema({

    couponKey:      { type: String, required: true },
    discount:       { type: Number, required: true },
    maxBillingAmount:{type: Number, default: 10000000},
    create_at:      { type: Date, default: Date.now},
    expired_date:   { type:Date, default: new Date(new Date().setMonth(new Date().getMonth() + 1))}
}, options)

export default mongoose.model('Coupon', CouponSchema)

import mongoose from 'mongoose'

const  { Schema } = mongoose;
const  { ObjectId } = Schema.Types

const options = {
    versionKey: false,
    toJSON: { virtuals: true }
}

var ProductSchema = new Schema({
    name:           {type: String, required: true },
    id_brand:       {type: ObjectId, required: true, ref: 'Brand'},
    price:          {type: Number, required: true},
    sales_price:    {type: Number, default:0},
    quantity:       {type: Number, default: 20},
    id_category:    {type: ObjectId, required: true, ref: 'Category'},
    image:          {type: Array},
    description:    {type: String, required: true},
    product_detail: {type: Object, required: true},
    create_at:      {type: Date, default: Date.now}
}, options)

ProductSchema.set('toJSON',{ virtuals: true })

ProductSchema.virtual('brand', {
    ref: 'Brand',
    localField: 'id_brand',
    foreignField: '_id',
    justOne: true
});

ProductSchema.virtual('category', {
    ref: 'Category',
    localField: 'id_category',
    foreignField: '_id',
    justOne: true
});

export default mongoose.model('Product', ProductSchema)

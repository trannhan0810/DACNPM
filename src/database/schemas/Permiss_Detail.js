import mongoose from 'mongoose'
const  { Schema } = mongoose;
const  { ObjectId } = Schema.Types

const options = {
    versionKey: false
}

const PermissionSchema = new Schema({
    id_role:            { type: ObjectId, required: true },
    id_per:             { type: ObjectId, required: true },
}, options)

export default mongoose.model('Permiss_Detail', PermissionSchema)

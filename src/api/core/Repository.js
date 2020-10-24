import { Model } from 'mongoose'

export default class Repository {
    
    model = Model

    constructor(model) {
        this.model = model
    }

    getById(id, column = []) {
        return this.model.findById(id).select(column)
    } 

    getByIds(ids, column = []) {
        return this.model.find({'_id': { $in: ids}}).select(column)
    } 

    getOne(condition = {}, column = []) {
        return this.model.findOne(condition).select(column)
       
    }

    getMany(condition = {}, column = []) {
        return this.model.find(condition).select(column)
    }

    createOne(payload) {
        return this.model.create(payload)
    }

    createMany(data) {
        return this.model.insertMany(data)
    }

    deleteOne(id) {
        return this.model.deleteOne({'_id' : id})
    }

    deleteMany(ids) {
        return this.model.deleteMany({'_id': { $in: ids}})
    }

    updateOne(id, payload) {
        return this.model.findByIdAndUpdate(id, payload)
    }
}
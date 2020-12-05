import Boom from '@hapi/boom'
import Repository from './Repository'


export default class Service {
    repository = Repository

    constructor(repository) {
        this.repository = repository
    }

    async getById(id, column = []) {
        try { 
            return await this.repository.getById(id, column)
        } catch {
            throw Boom.notFound()
        }
    } 

    async getByIds(ids, column = []) {
        try { 
            return await this.repository.getByIds(id, column)
        } catch {
            throw Boom.notFound()
        }
    } 

    async getOne(condition = {}, column = []) {
        try { 
            return await this.repository.getOne(condition, column)
        } catch {
            throw Boom.notFound()
        }
       
    }

    async getMany(condition = {}, column = []) {
        try { 
            return await this.repository.getMany(condition, column)
        } catch {
            throw Boom.notFound()
        }
    }

    async createOne(payload) {
        try { 
            return await this.repository.createOne(payload)
        } catch {
            
        }
    }

    async createMany(data) {
        try { 
            return await this.repository.createMany(payload)
        } catch {

        }
    }

    async deleteOne(id) {
        try { 
            return await this.repository.deleteOne(id)
        } catch {

        }
    }

    async deleteMany(ids) {
        try { 
            return await this.repository.deleteMany(ids)
        } catch {

        }
    }

    async updateOne(id, payload) {
        try { 
            return await this.repository.updateOne(id, payload)
        } catch {

        }
    }


}
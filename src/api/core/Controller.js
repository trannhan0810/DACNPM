import Service from './Service'
import _ from 'lodash'

export default class Controller {
    service = Service

    constructor(service) {
        this.service = service
    }

    async getById(req, res, next) {
        const { id } = req.params;
        res.send(await this.service.getById(id))
    } 

    async getByIds(req, res) {
        const ids = req.params;
        res.send(await this.service.getByIds(ids))
    } 

    async getOne(req, res) {
        const condition = req.query;
        res.send(await this.service.getOne(condition))
    }

    async getMany(req, res, next) {
        const condition = _.omit(req.query, 'limit')
        const result = await this.service.getMany(condition)
        const limit = req.query.limit||result.length
        res.send(result.slice(0,limit))
    }

    async createOne(req, res) {
        const payload = req.body;
        res.send(await this.service.createOne(payload))
    }

    async createMany(req, res) {
        const data = req.body;
        res.send(await this.service.createMany(data))
    }

    async deleteOne(req, res) {
        const { id } = req.params;
        res.send(await this.service.deleteOne(id))
    }

    async deleteMany(req, res) {
        const ids = req.body;
        res.send(await this.service.deleteMany(ids))
    }

    async updateOne(req, res) {
        const payload = req.body;
        const { id } = req.params;
        res.send(await this.service.updateOne(id, payload))
    }
}
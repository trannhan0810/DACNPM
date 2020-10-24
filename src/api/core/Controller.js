import Service from './Service'

export default class Controller {
    service = Service

    constructor(service) {
        this.service = service
    }

    async getById(req, res) {
        const { id } = req.params;
        res.send(await this.service.getById(id))
    } 

    async getByIds(req, res) {
        const { ids } = req.payload;
        res.send(await this.service.getByIds(ids))
    } 

    async getOne(req, res) {
        const { condition } = req;
        res.send(await this.service.getOne(condition))
    }

    async getMany(req, res) {
        const { condition } = req;
        res.send(await this.service.getMany(condition))
    }

    async createOne(req, res) {
        const { payload } = req;
        res.send(await this.service.createOne(payload))
    }

    async createMany(req, res) {
        const { data } = req.payload;
        res.send(await this.service.createMany(data))
    }

    async deleteOne(req, res) {
        const { id } = req.params;
        res.send(await this.service.deleteOne(id))
    }

    async deleteMany(req, res) {
        const { ids } = req.payload;
        res.send(await this.service.deleteMany(ids))
    }

    async updateOne(req, res) {
        const { params, payload } = req;
        const { id } = params;
        res.send(await this.service.updateOne(id, payload))
    }
}
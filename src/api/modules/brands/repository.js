import Repository from '../../core/Repository'
import Brand from "../../../database/schemas/Brand"

export default class BrandRepository extends Repository {

    static instance;

    constructor(model) {
        super(model)
    }


    static getRepository()
    {
        if(BrandRepository.instance == null)
        {
            BrandRepository.instance = new BrandRepository(Brand)
        }
        return BrandRepository.instance
    }
}

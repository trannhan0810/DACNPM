import Repository from '../../core/Repository'
import Category from "../../../database/schemas/Category"

export default class CategoryRepository extends Repository {

    static instance;

    constructor(model) {
        super(model)
    }


    static getRepository()
    {
        if(CategoryRepository.instance == null)
        {
            CategoryRepository.instance = new CategoryRepository(Category)
        }
        return CategoryRepository.instance
    }
}

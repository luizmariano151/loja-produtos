
import ProductModel from "../entities/ProductModel";
import RepositoryTemplate from "../templates/RepositoryTemplate";

export default class ProductRepository extends RepositoryTemplate{
    constructor(){
        super(ProductModel);    
    }
}
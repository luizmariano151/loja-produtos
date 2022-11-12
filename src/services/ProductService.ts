import ProductRepository from "../repositories/ProductRepository";
import Product from "../types/Product";
import UserService from "./UserService";

export default class ProductService {
    private repository: ProductRepository;
    private userService: UserService;

    constructor() {
        this.repository = new ProductRepository();
        this.userService = new UserService();
    }

    public async create(product: Product): Promise<Product>{
        try {
            const user = await this.userService.findByUuid(product.userUuid);
            if(user){
                const uuid = await this.repository.create(product);
                product._id = uuid;
                return uuid ? product : undefined;
            }
            return product;
        } catch (error) {
            return undefined;
        }
    }

    public async findByUuid(uuid: string): Promise<Product>{

        try {
            const produt = await this.repository.findByUuid(uuid);
            if(produt !== undefined){
                return produt;
            }
            return undefined; 
        } catch (error) {
            return undefined;
        }
    }

    public async read(){
        return this.repository.read;
    }

    public async delete(uuid: string): Promise<Product>{
        try {
            return await this.repository.delete(uuid);
        } catch (error) {
            return undefined;
        }
    }

    public async update(product: Product): Promise<Product>{
        try {
            const prod = await this.findByUuid(product._id);
            if(prod !== undefined){
                return await this.repository.update(prod);
            }
            return undefined;
        } catch (error) {
            return undefined;
        }
    }
}
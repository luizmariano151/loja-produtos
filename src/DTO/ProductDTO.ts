import Product from "../types/Product";

export default class ProductDTO{
    private uuid: string;
    private userUuid: string;
    private description: string;
    private price: Number;

    constructor(product: Product){
        this.uuid = product._id;
        this.userUuid = product.userUuid;
        this.description = product.description;
        this.price = product.price;
    }

    public static converter(products: Product[]): ProductDTO[]{
        if(products.length !== 0){
            return products.map((productsItem) => new ProductDTO(productsItem))
        }

        return undefined;
    }
}
import DatabaseConfig from "../src/configuration/DatabaseConfig";
import UserService from "../src/services/UserService";
import User from "../src/types/User"
import ProductService from "../src/services/ProductService";
import Product from "../src/types/Product";
import {expect, test, describe, beforeAll, afterAll} from '@jest/globals';

describe("should be test the product service methods", ()=>{

    const user: User = {
        email:"fulano@gmail.com",
        name: "Fulano da Silva",
        password: "123456"
    }

    const productService = new ProductService();

    let product: Product;

    beforeAll( async ()=>{
        await DatabaseConfig.connect();
        const userService = new UserService();

        const result = await userService.create(user);
        user._id = result._id;
    })

    afterAll(async () =>{
        const userService = new UserService();
        await userService.delete(user._id);
    });

    test("sould be create a product", async () => {
        const entity: Product = {
             userUuid: user._id,
             description: "Relógio Oriente",
             price: 250.00,
        };

        const result = await productService.create(entity);

        product = result;
        expect(result).not.toBe(undefined);
    });

    test("should be get all", async () => {

        const result = await productService.read();
        expect(result.length).not.toBe(0);
    });

    test("should be get by uuid", async () => {

        const result = await productService.findByUuid(product._id);
        expect(result).not.toBe(undefined);
    });

    test("should be update", async () => {

        const entity: Product = {
            _id: product._id,
            userUuid: user._id,
            description: "Panela de Barro",
            price: 100.00,
       };

        const result = await productService.update(entity);
        expect(result).not.toBe(undefined);
        
    });

    test("should be delete", async () => {

        const result = await productService.delete(product._id);
        expect(result).not.toBe(undefined);

    });

})
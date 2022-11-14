import { Request, Response } from "express";
import LoggerComponent from "../components/LoggerComponent";
import ParamtersValidationComponent from "../components/ParamtersValidationComponent";
import ProductDTO from "../DTO/ProductDTO";
import ProductService from "../services/ProductService";
import Product from "../types/Product";

const serviceProduct = new ProductService;
const logger = new LoggerComponent("ProductController");

export default class ProductController{

    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const desirableParameters = ["userUuid","description","price"];
            ParamtersValidationComponent.allParamtersRequired(request.body, desirableParameters);
    
            const product = request.body;    
            const result = await serviceProduct.create(product);
    
            if(result !== undefined){
                const dto = new ProductDTO(result);
                logger.info("/product. create method response sucessfuly", result);
                return response.status(201).json(dto);
            }

            logger.info("/product. create method response unsucessfuly", result);
            return response.status(400).json(result);
        } catch (error) {
            logger.info("/product. create method response unsucessfuly", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async read(request: Request, response: Response): Promise<Response> {
        try {
        
            const productList:Product[] = await serviceProduct.read();
            const result = ProductDTO.converter(productList);

            logger.info("/product. get method response sucessfuly", result ? result[0] : result);
            return response.status(200).json(result);   
        } catch (error) {
            logger.error("/product. get method response unsucessfuly", error.message );
            return response.status(400).json(error.message);   
        }
    }

    public async findByUuid(request: Request, response: Response): Promise<Response> {

        try {
            const desirableParameters = ["uuid"];
            ParamtersValidationComponent.allParamtersRequired(request.body, desirableParameters);
            const {uuid} = request.body;

           const product: Product = await serviceProduct.findByUuid(uuid);

            if(product){
                const result = new ProductDTO(product);
                logger.info("/product. get method response sucessfuly", result);
                return response.status(200).json(result);   
            }

           logger.info("/product. get method response unsucessfuly", product);
           return response.status(400).json(product); 
        } catch (error) {
            logger.error("/product. get method response unsucessfuly", error.message );
            return response.status(400).json(error.message);   
        }
    }

    public async update(request: Request, response: Response):Promise<Response> {
        try {
            const desirableParameters = ["uuid"];
            ParamtersValidationComponent.allParamtersRequired(request.body, desirableParameters);

            const { uuid, description, price} = request.body;

            const result = await serviceProduct.update(uuid, description, price);

            if(result !== undefined){
                logger.info("/product. update method response sucessfuly", { result });
                return response.status(200).json(new ProductDTO(result));
            }
            logger.warn("/product. update method response unsucessfuly", { result });
            return response.status(400).json("/product. undate method response unsucessfuly");
        } catch (error) {
            logger.error("/product. update method response unsucessfuly", error.message);
            return response.status(400).json(error.message);
        }
    }
    
    public async delete(request: Request, response: Response): Promise<Response> {
 
        try {
            const desirableParameters = ["uuid"];
            ParamtersValidationComponent.allParamtersRequired(request.body, desirableParameters);

            const { uuid } = request.body;
            const result = await serviceProduct.delete(uuid);
            logger.info("/product. Delete method response sucessfuly", result);
            return response.status(200).json("Deletado com sucesso. Uuid: " + uuid);

        } catch (error) {
            logger.error("/product. Delete method response unsucessfuly", error.message);
            return response.status(400).json(error.message);  
        }
    }





    

}
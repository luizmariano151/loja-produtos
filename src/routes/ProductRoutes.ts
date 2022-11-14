
import ProductController from "../controllers/ProductController";
import AuthorizationTokenMiddleware from "../middlewares/AuthorizationTokenMiddleware";
import RoutesTemplate from "../templates/RoutesTemplate";

export default class ProductRoutes extends RoutesTemplate {

    constructor(){
        super();
        const controller = new ProductController;
        const permitUser = new AuthorizationTokenMiddleware();
        
        this.routes.get("/",  permitUser.permitUserRule(["CREATE"]), controller.read);
        this.routes.post("/salvar", permitUser.permitUserRule(["CREATE"]), controller.create);
        this.routes.get("/buscar",permitUser.permitUserRule(["CREATE"]), controller.findByUuid);
        this.routes.post("/alterar",permitUser.permitUserRule(["UPDATE"]), controller.update);
        this.routes.delete("/deletar",permitUser.permitUserRule(["UPDATE"]), controller.delete);
    }
    
}
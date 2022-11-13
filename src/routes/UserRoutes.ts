import UserController from "../controllers/UserController";
import AuthorizationTokenMiddleware from "../middlewares/AuthorizationTokenMiddleware";
import RoutesTemplate from "../templates/RoutesTemplate";

export default class UserRoutes extends RoutesTemplate {

    constructor(){
        super();
        const controller = new UserController();
        const permitUser = new AuthorizationTokenMiddleware();

        this.routes.get("/", permitUser.permitUserRule(["ADM"]), controller.read);
        this.routes.post("/salvar", controller.create);
        this.routes.delete("/deletar/:uuid", permitUser.permitUserRule(["ADM", "DELETE"]), controller.delete);
        this.routes.patch("/alterar/:uuid", permitUser.permitUserRule(["UPDATE"]), controller.updateName);
        this.routes.patch("/addRole/:uuid", permitUser.permitUserRule(["ADM", "UPDATE"]), controller.addRule);
        this.routes.patch("/deletarRole/:uuid", permitUser.permitUserRule(["ADM", "UPDATE"]), controller.deleteRule);
        this.routes.post("/login", controller.login);
        
    }


}
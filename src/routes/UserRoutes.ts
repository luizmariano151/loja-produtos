import UserController from "../controllers/UserController";
import RoutesTemplate from "../templates/RoutesTemplate";

export default class UserRoutes extends RoutesTemplate {

    constructor(){
        super();
        const controller = new UserController();

        this.routes.get("/", controller.read);
        this.routes.post("/salvar", controller.create);
        this.routes.delete("/deletar/:uuid", controller.delete);
        this.routes.patch("/alterar/:uuid", controller.updateName);
        this.routes.patch("/addRole/:uuid", controller.addRule);
        this.routes.patch("/deletarRole/:uuid", controller.deleteRule);
        this.routes.post("/login", controller.login);
        
    }


}
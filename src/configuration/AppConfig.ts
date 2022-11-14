import express, { Express, json } from "express";
import cors from "cors";
import UserRoutes from "../routes/UserRoutes";
import ProductRoutes from "../routes/ProductRoutes";
import { Request, Response } from "express";
export default class App {
    private app: Express;

    constructor () {
        this.app = express();
        this.configApp();
        this.configRoutes();
        this.configDocumentation();
    }

    private configApp():void {
        this.app.use( json() );
        this.app.use( cors() );
    }

    private configRoutes(): void {
        const userRoutes = new UserRoutes();
        const productRoutes = new ProductRoutes();

        this.app.use("/user", userRoutes.getRoutes());
        this.app.use("/product", productRoutes.getRoutes());
    }

    public configDocumentation(): void {
        this.app.use(express.static("documentation"));
        this.app.use("/", (request: Request, response:Response)=>{
            response.render("index.html");
        });
    }

    public getApp(): Express {
        return this.app;
    }
}
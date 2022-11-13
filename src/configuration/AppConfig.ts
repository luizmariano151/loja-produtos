import express, { Express, json } from "express";
import cors from "cors";
import UserRoutes from "../routes/UserRoutes";

export default class App {
    private app: Express;

    constructor () {
        this.app = express();
        this.configApp();
        this.configRoutes();
    }

    private configApp():void {
        this.app.use( json() );
        this.app.use( cors() );
    }

    private configRoutes(): void {
        const userRoutes = new UserRoutes();

        this.app.use("/user", userRoutes.getRoutes());
       
    }

    public getApp(): Express {
        return this.app;
    }
}
import DatabaseConfig from "./configuration/DatabaseConfig";

class Server {
    public startServer():void{
        DatabaseConfig.connect().then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error);
        });
    }
}

new Server().startServer();
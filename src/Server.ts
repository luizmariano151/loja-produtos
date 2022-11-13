import DatabaseConfig from "./configuration/DatabaseConfig";
import { Express } from "express";
import DotenvComponent from "./components/DotEnvComponents";
import os from "os";
import App from "./configuration/AppConfig";
import LoggerComponent from "./components/LoggerComponent";

class Server {
  private server: Express;

  constructor() {
    const app = new App();
    this.server = app.getApp();
  }

  public startServer(): void {
    DatabaseConfig.connect();
    this.server.listen(
      DotenvComponent.API_PORT,
      Server.showTheSystemInformation
    );
  }

  private static showTheSystemInformation(): void {
    const arch = os.arch();
    const platform = os.platform();
    const type = os.type();
    const mem = os.totalmem();
    const cpus = os.cpus();
    const logger = new LoggerComponent(Server.name);

    logger.info(`SERVICE RUNNING ON PORT: ${DotenvComponent.API_PORT}`);
    logger.info(`SO: ${type} ${platform} ${arch}`);
    logger.info(`RAM: ${Math.floor(mem * 10 ** -9)} GB`);
    logger.info(`CORES: ${cpus.length}`);
    logger.info(`CPU: ${cpus[0].model}`);
  }
}

new Server().startServer();

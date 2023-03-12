import express, { Express } from 'express';
import { config } from './config/config';
import { WeddingServer } from './setupServer';
import databaseConnection from './setupDatabase';

class Application {
    public initialize(): void {
        this.loadConfig();
        databaseConnection();
        const app: Express = express();
        const server: WeddingServer = new WeddingServer(app);
        server.start();
    }
    private loadConfig(): void {
        config.validateConfig();
    }
}
const application: Application = new Application(); //we are not passing anything because there is no constructor
application.initialize();

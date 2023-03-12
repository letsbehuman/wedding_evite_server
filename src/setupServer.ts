import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import Logger from 'bunyan';
import { config } from './config/config';
import HTTP_STATUS from 'http-status-codes';
import { CustomError, IErrorResponse } from './globals/helpers/error-handler';
import applicationRoutes from './routes';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import hpp from 'hpp';

const log: Logger = config.createLogger('server'); //"server" will indentify where the log is coming from

export class WeddingServer {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }
    public start(): void {
        this.securityMiddelware(this.app);
        this.standardMiddelware(this.app);
        this.routerMiddelware(this.app);
        this.globaErrorHandler(this.app);
        this.startServer(this.app);
    }
    private securityMiddelware(app: Application): void {
        app.use(
            cookieSession({
                name: 'session',
                keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
                maxAge: 24 * 7 * 3600000,
                secure: config.NODE_ENV !== 'development'
            })
        );
        app.use(hpp());
        app.use(helmet());
        app.use(
            cors({
                origin: config.CLIENT_URL,
                credentials: true,
                optionsSuccessStatus: 200,
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
            })
        );
    }
    private standardMiddelware(app: Application): void {
        app.use(json({ limit: '50mb' }));
        app.use(urlencoded({ extended: true, limit: '50mb' }));
    }

    private routerMiddelware(app: Application): void {
        applicationRoutes(app);
    }
    private globaErrorHandler(app: Application): void {
        app.all('*', (req: Request, res: Response) => {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
        }); // this will catch request that does not exist
        app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
            log.error(error);
            if (error instanceof CustomError) {
                return res.status(error.statusCode).json(error.serializeErrors());
            }
            next();
        });
    }
    private async startServer(app: Application): Promise<void> {
        try {
            const httpServer: http.Server = new http.Server(app);
            this.startHttpServer(httpServer);
        } catch (error) {
            log.error(error);
        }
    }
    private startHttpServer(httpServer: http.Server): void {
        log.info(`server has started with proccess ${process.pid}`);
        httpServer.listen(config.PORT, () => {
            log.info(`Server running on port ${config.PORT}`);
        });
    }
}

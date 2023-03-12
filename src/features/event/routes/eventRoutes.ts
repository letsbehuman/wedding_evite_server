import express, { Router } from 'express';
import { Create } from '../controller/add-event';

class EventRoutes {
    private router: Router;
    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.post('/event', Create.prototype.event);

        return this.router;
    }
}
export const eventRoutes: EventRoutes = new EventRoutes();

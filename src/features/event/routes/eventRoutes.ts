import { authMiddleware } from '@globals/helpers/auth-middleware';
import express, { Router } from 'express';
import { Create } from '@event/controller/add-event';
import { GetEvent } from '@event/controller/get-event';
import { Delete } from '@event/controller/delete-event';
import { Update } from '@event/controller/update-event';

class EventRoutes {
    private router: Router;
    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.post('/event', authMiddleware.checkAuthentication, Create.prototype.event);

        this.router.get(
            '/event/:userId',
            authMiddleware.checkAuthentication,
            GetEvent.prototype.event
        );
        this.router.delete(
            '/event/:eventId',
            authMiddleware.checkAuthentication,
            Delete.prototype.event
        );
        this.router.put(
            '/event/:eventId',
            authMiddleware.checkAuthentication,
            Update.prototype.event
        );

        return this.router;
    }
}
export const eventRoutes: EventRoutes = new EventRoutes();

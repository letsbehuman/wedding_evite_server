import { authMiddleware } from '@globals/helpers/auth-middleware';
import express, { Router } from 'express';
import { AddGuest } from '@guestList/controller/add-guest';
import { DeleteGuest } from '@guestList/controller/delete-guest';
import { GetGuests } from '@guestList/controller/get-guestList';

class GuestListRoutes {
    private router: Router;
    constructor() {
        this.router = express.Router();
    }
    public routes(): Router {
        this.router.post(
            '/event/guest',
            authMiddleware.checkAuthentication,
            AddGuest.prototype.guest
        );
        this.router.delete(
            '/event/guest/:guestId',
            authMiddleware.checkAuthentication,
            DeleteGuest.prototype.guest
        );

        this.router.get(
            '/event/guest/list',
            authMiddleware.checkAuthentication,
            GetGuests.prototype.guests
        );

        return this.router;
    }
}
export const guestListRoutes: GuestListRoutes = new GuestListRoutes();

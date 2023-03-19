import { UpdateGuest } from '@guestList/controller/update-guest';
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
        this.router.post('/event/confirmation/:eventId/:familyId', AddGuest.prototype.guest);

        this.router.delete('/event/guest/:guestId', DeleteGuest.prototype.guest);

        this.router.get('/event/guestlist/:eventId', GetGuests.prototype.all);

        this.router.put('/event/confirmation/:eventId/:familyId', UpdateGuest.prototype.guest);

        return this.router;
    }
}
export const guestListRoutes: GuestListRoutes = new GuestListRoutes();

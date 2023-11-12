import { addFamilyGuests } from '@familyGuest/controller/add-familyGuest';
import { GetFamilyGuests } from '@familyGuest/controller/get-familyGuest';
import { authMiddleware } from '@globals/helpers/auth-middleware';
import express, { Router } from 'express';

class FamilyGuestListRoutes {
    private router: Router;
    constructor() {
        this.router = express.Router();
    }
    public routes(): Router {
        this.router.post(
            '/event/family/:eventId',
            authMiddleware.checkAuthentication,
            addFamilyGuests.prototype.families
        );
        this.router.get(
            '/event/confirmation/:eventId/:familyId',
            GetFamilyGuests.prototype.familyInvite
        );
        return this.router;
    }
}
export const familyGuestListRoutes: FamilyGuestListRoutes = new FamilyGuestListRoutes();

import { addFamilyGuest } from '@familyGuest/controller/add-familyGuest';
import { authMiddleware } from '@globals/helpers/auth-middleware';
import express, { Router } from 'express';

class FamilyGuestListRoutes {
    private router: Router;
    constructor() {
        this.router = express.Router();
    }
    public routes(): Router {
        this.router.post(
            '/event/family/',
            authMiddleware.checkAuthentication,
            addFamilyGuest.prototype.family
        );
        return this.router;
    }
}
export const familyGuestListRoutes: FamilyGuestListRoutes = new FamilyGuestListRoutes();

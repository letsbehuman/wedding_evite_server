import { familyGuestListRoutes } from '@familyGuest/routes/familyGuestRoutes';
import { guestListRoutes } from '@guestList/routes/guestListRoutes';
import { eventRoutes } from '@event/routes/eventRoutes';
import { authRoutes } from '@auth/routes/authRoutes';
import { Application } from 'express';
import { authMiddleware } from '@globals/helpers/auth-middleware';
import { currentUserRoutes } from '@auth/routes/currentRoutes';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
    const routes = () => {
        app.use(BASE_PATH, authRoutes.routes());
        app.use(BASE_PATH, authRoutes.signoutRoute());

        app.use(BASE_PATH, authMiddleware.verifyUser, eventRoutes.routes());
        app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
        app.use(BASE_PATH, authMiddleware.verifyUser, guestListRoutes.routes());
        app.use(BASE_PATH, authMiddleware.verifyUser, familyGuestListRoutes.routes());
    };

    routes();
};

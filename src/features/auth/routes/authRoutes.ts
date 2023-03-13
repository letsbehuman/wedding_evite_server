import { SignUp } from '@auth/controller/signup';
import express, { Router } from 'express';
import { SignIn } from '@auth/controller/signin';
import { SignOut } from '@auth/controller/signout';

class AuthRoutes {
    private router: Router;
    constructor() {
        this.router = express.Router();
    }
    public routes(): Router {
        this.router.post('/signup', SignUp.prototype.create);
        this.router.post('/signin', SignIn.prototype.read);

        return this.router;
    }
    public signoutRoute(): Router {
        this.router.get('/signout', SignOut.prototype.update);

        return this.router;
    }
}
export const authRoutes: AuthRoutes = new AuthRoutes();

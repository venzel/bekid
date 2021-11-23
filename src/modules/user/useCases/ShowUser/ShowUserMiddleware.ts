import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ShowUserController } from './ShowUserController';
import { ShowUserValidator } from './ShowUserValidator';

class ShowUserMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new ShowUserValidator();
        const { handle } = new ShowUserController();

        router[method](path, authenticate, validate, handle);
    }
}

export { ShowUserMiddleware };

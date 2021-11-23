import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { UpdatePasswordUserValidator } from './UpdatePasswordUserValidator';
import { UpdatePasswordUserController } from './UpdatePasswordUserController';

class UpdatePasswordUserMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new UpdatePasswordUserValidator();
        const { handle } = new UpdatePasswordUserController();

        router[method](path, authenticate, validate, handle);
    }
}

export { UpdatePasswordUserMiddleware };

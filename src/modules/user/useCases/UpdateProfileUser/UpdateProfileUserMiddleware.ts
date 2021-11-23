import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { UpdateProfileUserValidator } from './UpdateProfileUserValidator';
import { UpdateProfileUserController } from './UpdateProfileUserController';

class UpdateProfileUserMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new UpdateProfileUserValidator();
        const { handle } = new UpdateProfileUserController();

        router[method](path, authenticate, validate, handle);
    }
}

export { UpdateProfileUserMiddleware };

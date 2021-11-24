import { Router } from 'express';
import { AuthenticateUserValidator } from './AuthenticateUserValidator';
import { AuthenticateUserController } from '@modules/user/useCases/AuthenticateUser/AuthenticateUserController';

class AuthenticateUserMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { validate } = new AuthenticateUserValidator();
        const { handle } = new AuthenticateUserController();

        router[method](path, validate, handle);
    }
}

export { AuthenticateUserMiddleware };
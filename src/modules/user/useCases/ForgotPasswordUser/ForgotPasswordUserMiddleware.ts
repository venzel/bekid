import { Router } from 'express';
import { ForgotPasswordUserController } from './ForgotPasswordUserController';
import { ForgotPasswordUserValidator } from './ForgotPasswordUserValidator';

class ForgotPasswordUserMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { validate } = new ForgotPasswordUserValidator();
        const { handle } = new ForgotPasswordUserController();

        router[method](path, validate, handle);
    }
}

export { ForgotPasswordUserMiddleware };

import { Router } from 'express';
import { CreateUserValidator } from './CreateUserValidator';
import { CreateUserController } from './CreateUserController';

class CreateUserMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { validate } = new CreateUserValidator();
        const { handle } = new CreateUserController();

        router[method](path, validate, handle);
    }
}

export { CreateUserMiddleware };

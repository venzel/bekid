import { Router } from 'express';
import { CreateGroupUserController } from './CreateGroupUserController';
import { CreateGroupUserValidator } from './CreateGroupUserValidator';

class CreateGroupUserMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { validate } = new CreateGroupUserValidator();
        const { handle } = new CreateGroupUserController();

        router[method](path, validate, handle);
    }
}

export { CreateGroupUserMiddleware };

import { Router } from 'express';

import { CreateUserValidator } from './CreateUserValidator';
import { CreateUserController } from './CreateUserController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class CreateUserMiddleware {
    public register(router: Router, method: method, _: IRoleDTO | IRoleDTO[], path: string): void {
        const { validate } = new CreateUserValidator();
        const { handle } = new CreateUserController();

        router[method](path, validate, handle);
    }
}

export { CreateUserMiddleware };

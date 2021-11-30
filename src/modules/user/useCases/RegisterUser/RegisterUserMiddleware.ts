import { Router } from 'express';

import { RegisterUserValidator } from './RegisterUserValidator';
import { RegisterUserController } from './RegisterUserController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class RegisterUserMiddleware {
    public register(router: Router, method: method, _: IRoleDTO | IRoleDTO[], path: string): void {
        const { validate } = new RegisterUserValidator();
        const { handle } = new RegisterUserController();

        router[method](path, validate, handle);
    }
}

export { RegisterUserMiddleware };

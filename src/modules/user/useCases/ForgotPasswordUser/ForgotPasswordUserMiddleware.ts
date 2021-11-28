import { Router } from 'express';

import { ForgotPasswordUserController } from './ForgotPasswordUserController';
import { ForgotPasswordUserValidator } from './ForgotPasswordUserValidator';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class ForgotPasswordUserMiddleware {
    public register(router: Router, method: method, _: IRoleDTO | IRoleDTO[], path: string): void {
        const { validate } = new ForgotPasswordUserValidator();
        const { handle } = new ForgotPasswordUserController();

        router[method](path, validate, handle);
    }
}

export { ForgotPasswordUserMiddleware };

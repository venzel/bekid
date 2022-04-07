import { Router } from 'express';

import { ResetPasswordUserController } from './ResetPasswordUserController';
import { ResetPasswordUserValidator } from './ResetPasswordUserValidator';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class ResetPasswordUserMiddleware {
    public register(router: Router, method: method, _: IRoleDTO | IRoleDTO[], path: string): void {
        const { validate } = new ResetPasswordUserValidator();
        const { handle } = new ResetPasswordUserController();

        router[method](path, validate, handle);
    }
}

export { ResetPasswordUserMiddleware };

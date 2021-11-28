import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { UpdatePasswordUserValidator } from './UpdatePasswordUserValidator';
import { UpdatePasswordUserController } from './UpdatePasswordUserController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class UpdatePasswordUserMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new UpdatePasswordUserValidator();
        const { handle } = new UpdatePasswordUserController();

        router[method](path, authenticate, validate, role(roles), handle);
    }
}

export { UpdatePasswordUserMiddleware };

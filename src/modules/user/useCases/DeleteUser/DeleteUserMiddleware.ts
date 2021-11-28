import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { DeleteUserValidator } from './DeleteUserValidator';
import { DeleteUserController } from './DeleteUserController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class DeleteUserMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new DeleteUserValidator();
        const { handle } = new DeleteUserController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { DeleteUserMiddleware };

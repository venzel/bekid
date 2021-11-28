import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ShowUserController } from './ShowUserController';
import { ShowUserValidator } from './ShowUserValidator';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class ShowUserMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new ShowUserValidator();
        const { handle } = new ShowUserController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { ShowUserMiddleware };

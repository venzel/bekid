import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { ListUserController } from './ListUserController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class ListUserMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ListUserController();

        router[method](path, authenticate, role(roles), handle);
    }
}

export { ListUserMiddleware };

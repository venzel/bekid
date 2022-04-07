import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { ToggleRoleUserValidator } from './ToggleRoleUserValidator';
import { ToggleRoleUserController } from './ToggleRoleUserController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class ToggleRoleUserMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string) {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new ToggleRoleUserValidator();
        const { handle } = new ToggleRoleUserController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { ToggleRoleUserMiddleware };

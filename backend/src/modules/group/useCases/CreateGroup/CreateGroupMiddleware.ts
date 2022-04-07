import { Router } from 'express';

import { CreateGroupValidator } from './CreateGroupValidator';
import { CreateGroupController } from './CreateGroupController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class CreateGroupMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateGroupValidator();
        const { handle } = new CreateGroupController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { CreateGroupMiddleware };

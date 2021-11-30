import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { AddOneUserInGroupController } from './AddOneUserInGroupController';
import { AddOneUserInGroupValidator } from './AddOneUserInGroupValidator';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class AddOneUserInGroupMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new AddOneUserInGroupValidator();
        const { handle } = new AddOneUserInGroupController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { AddOneUserInGroupMiddleware };

import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { UpdateGroupValidator } from './UpdateGroupValidator';
import { UpdateGroupController } from './UpdateGroupController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class UpdateGroupMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new UpdateGroupValidator();
        const { handle } = new UpdateGroupController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { UpdateGroupMiddleware };
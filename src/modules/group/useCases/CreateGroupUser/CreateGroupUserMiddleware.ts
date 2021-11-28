import { Router } from 'express';

import { CreateGroupUserController } from './CreateGroupUserController';
import { CreateGroupUserValidator } from './CreateGroupUserValidator';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class CreateGroupUserMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateGroupUserValidator();
        const { handle } = new CreateGroupUserController();

        router[method](path, role(roles), validate, handle);
    }
}

export { CreateGroupUserMiddleware };

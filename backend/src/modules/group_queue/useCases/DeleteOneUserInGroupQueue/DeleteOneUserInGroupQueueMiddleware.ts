import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { DeleteOneUserInGroupQueueValidator } from './DeleteOneUserInGroupQueueValidator';
import { DeleteOneUserInGroupQueueController } from './DeleteOneUserInGroupQueueController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class DeleteOneUserInGroupQueueMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new DeleteOneUserInGroupQueueValidator();
        const { handle } = new DeleteOneUserInGroupQueueController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { DeleteOneUserInGroupQueueMiddleware };

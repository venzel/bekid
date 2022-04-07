import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { AddOneUserInGroupQueueValidator } from './AddOneUserInGroupQueueValidator';
import { AddOneUserInGroupQueueController } from './AddOneUserInGroupQueueController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class AddOneUserInGroupQueueMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new AddOneUserInGroupQueueValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new AddOneUserInGroupQueueController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { AddOneUserInGroupQueueMiddleware };

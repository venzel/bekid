import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { AddOneUserInQueueValidator } from './AddOneUserInQueueValidator';
import { AddOneUserInQueueController } from './AddOneUserInQueueController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class AddOneUserInQueueMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new AddOneUserInQueueValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new AddOneUserInQueueController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { AddOneUserInQueueMiddleware };

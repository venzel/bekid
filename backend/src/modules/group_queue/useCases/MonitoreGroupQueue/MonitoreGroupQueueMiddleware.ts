import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { MonitoreGroupQueueValidator } from './MonitoreGroupQueueValidator';
import { MonitoreGroupQueueController } from './MonitoreGroupQueueController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class MonitoreGroupQueueMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new MonitoreGroupQueueValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new MonitoreGroupQueueController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { MonitoreGroupQueueMiddleware };

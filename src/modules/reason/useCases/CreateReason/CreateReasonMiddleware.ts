import { Router } from 'express';

import { CreateReasonValidator } from './CreateReasonValidator';
import { CreateReasonController } from './CreateReasonController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class CreateReasonMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateReasonValidator();
        const { handle } = new CreateReasonController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { CreateReasonMiddleware };

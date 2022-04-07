import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { UpdateReasonValidator } from './UpdateReasonValidator';
import { UpdateReasonController } from './UpdateReasonController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class UpdateReasonMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new UpdateReasonValidator();
        const { handle } = new UpdateReasonController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { UpdateReasonMiddleware };

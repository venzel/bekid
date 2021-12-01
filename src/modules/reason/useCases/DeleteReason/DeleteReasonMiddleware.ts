import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { DeleteReasonValidator } from './DeleteReasonValidator';
import { DeleteReasonController } from './DeleteReasonController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class DeleteReasonMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new DeleteReasonValidator();
        const { handle } = new DeleteReasonController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { DeleteReasonMiddleware };

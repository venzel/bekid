import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ShowReasonValidator } from './ShowReasonValidator';
import { ShowReasonController } from './ShowReasonController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class ShowReasonMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new ShowReasonValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ShowReasonController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { ShowReasonMiddleware };

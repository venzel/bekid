import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ShowGroupValidator } from './ShowGroupValidator';
import { ShowGroupController } from './ShowGroupController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class ShowGroupMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new ShowGroupValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ShowGroupController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { ShowGroupMiddleware };

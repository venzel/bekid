import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { SaveGroupUserController } from './SaveGroupUserController';
import { SaveGroupUserValidator } from './SaveGroupUserValidator';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class SaveGroupUserMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new SaveGroupUserValidator();
        const { handle } = new SaveGroupUserController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { SaveGroupUserMiddleware };

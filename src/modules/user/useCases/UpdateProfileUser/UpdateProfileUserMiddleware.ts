import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { UpdateProfileUserValidator } from './UpdateProfileUserValidator';
import { UpdateProfileUserController } from './UpdateProfileUserController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class UpdateProfileUserMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new UpdateProfileUserValidator();
        const { handle } = new UpdateProfileUserController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { UpdateProfileUserMiddleware };

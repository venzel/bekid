import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { UpdateActorValidator } from './UpdateActorValidator';
import { UpdateActorController } from './UpdateActorController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class UpdateActorMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new UpdateActorValidator();
        const { handle } = new UpdateActorController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { UpdateActorMiddleware };

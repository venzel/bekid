import { Router } from 'express';

import { CreateActorValidator } from './CreateActorValidator';
import { CreateActorController } from './CreateActorController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class CreateActorMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateActorValidator();
        const { handle } = new CreateActorController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { CreateActorMiddleware };

import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { DeleteActorValidator } from './DeleteActorValidator';
import { DeleteActorController } from './DeleteActorController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class DeleteActorMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new DeleteActorValidator();
        const { handle } = new DeleteActorController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { DeleteActorMiddleware };

import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ShowActorValidator } from './ShowActorValidator';
import { ShowActorController } from './ShowActorController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class ShowActorMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new ShowActorValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ShowActorController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { ShowActorMiddleware };

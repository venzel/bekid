import { Router } from 'express';

import { CreateVoteActorValidator } from './CreateVoteActorValidator';
import { CreateVoteActorController } from './CreateVoteActorController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class CreateVoteActorMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateVoteActorValidator();
        const { handle } = new CreateVoteActorController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { CreateVoteActorMiddleware };

import { Router } from 'express';

import { CreateVoteValidator } from './CreateVoteValidator';
import { CreateVoteController } from './CreateVoteController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class CreateVoteMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateVoteValidator();
        const { handle } = new CreateVoteController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { CreateVoteMiddleware };

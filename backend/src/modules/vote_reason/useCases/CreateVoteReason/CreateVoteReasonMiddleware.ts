import { Router } from 'express';

import { CreateVoteReasonValidator } from './CreateVoteReasonValidator';
import { CreateVoteReasonController } from './CreateVoteReasonController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class CreateVoteReasonMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateVoteReasonValidator();
        const { handle } = new CreateVoteReasonController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { CreateVoteReasonMiddleware };

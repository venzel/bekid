import { Router } from 'express';

import { CreateVoteQuestionValidator } from './CreateVoteQuestionValidator';
import { CreateVoteQuestionController } from './CreateVoteQuestionController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class CreateVoteQuestionMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateVoteQuestionValidator();
        const { handle } = new CreateVoteQuestionController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { CreateVoteQuestionMiddleware };

import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ListVoteCommentController } from './ListVoteCommentController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class ListVoteCommentMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ListVoteCommentController();

        router[method](path, authenticate, role(roles), handle);
    }
}

export { ListVoteCommentMiddleware };

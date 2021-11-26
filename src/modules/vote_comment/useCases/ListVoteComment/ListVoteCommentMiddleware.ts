import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ListVoteCommentController } from './ListVoteCommentController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class ListVoteCommentMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ListVoteCommentController();

        router[method](path, authenticate, role(['ADMIN']), handle);
    }
}

export { ListVoteCommentMiddleware };
import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ListVoteQuestionController } from './ListVoteQuestionController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class ListVoteQuestionMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ListVoteQuestionController();

        router[method](path, authenticate, role(['ADMIN']), handle);
    }
}

export { ListVoteQuestionMiddleware };

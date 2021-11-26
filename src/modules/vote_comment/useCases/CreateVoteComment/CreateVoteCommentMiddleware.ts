import { Router } from 'express';
import { CreateVoteCommentValidator } from './CreateVoteCommentValidator';
import { CreateVoteCommentController } from './CreateVoteCommentController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class CreateVoteCommentMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateVoteCommentValidator();
        const { handle } = new CreateVoteCommentController();

        router[method](path, authenticate, role(['USER']), validate, handle);
    }
}

export { CreateVoteCommentMiddleware };

import { Router } from 'express';
import { CreateVoteQuestionValidator } from './CreateVoteQuestionValidator';
import { CreateVoteQuestionController } from './CreateVoteQuestionController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class CreateVoteQuestionMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateVoteQuestionValidator();
        const { handle } = new CreateVoteQuestionController();

        router[method](path, authenticate, role(['USER']), validate, handle);
    }
}

export { CreateVoteQuestionMiddleware };

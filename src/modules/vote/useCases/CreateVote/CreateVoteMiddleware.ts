import { Router } from 'express';
import { CreateVoteValidator } from './CreateVoteValidator';
import { CreateVoteController } from './CreateVoteController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class CreateVoteMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateVoteValidator();
        const { handle } = new CreateVoteController();

        router[method](path, authenticate, role(['USER']), validate, handle);
    }
}

export { CreateVoteMiddleware };

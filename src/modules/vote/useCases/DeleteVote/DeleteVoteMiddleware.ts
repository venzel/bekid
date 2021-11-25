import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { DeleteVoteValidator } from './DeleteVoteValidator';
import { DeleteVoteController } from './DeleteVoteController';

class DeleteVoteMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new DeleteVoteValidator();
        const { handle } = new DeleteVoteController();

        router[method](path, authenticate, validate, handle);
    }
}

export { DeleteVoteMiddleware };

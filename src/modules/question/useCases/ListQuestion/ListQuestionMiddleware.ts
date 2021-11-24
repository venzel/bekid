import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ListQuestionController } from './ListQuestionController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class ListQuestionMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ListQuestionController();

        router[method](path, authenticate, role(['ADMIN']), handle);
    }
}

export { ListQuestionMiddleware };

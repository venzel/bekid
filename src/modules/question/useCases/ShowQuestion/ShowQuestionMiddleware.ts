import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ShowQuestionValidator } from './ShowQuestionValidator';
import { ShowQuestionController } from './ShowQuestionController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class ShowQuestionMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new ShowQuestionValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ShowQuestionController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { ShowQuestionMiddleware };

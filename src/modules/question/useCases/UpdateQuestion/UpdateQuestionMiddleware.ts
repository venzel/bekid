import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { UpdateQuestionValidator } from './UpdateQuestionValidator';
import { UpdateQuestionController } from './UpdateQuestionController';

class UpdateQuestionMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new UpdateQuestionValidator();
        const { handle } = new UpdateQuestionController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { UpdateQuestionMiddleware };

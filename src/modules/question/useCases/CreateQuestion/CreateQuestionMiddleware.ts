import { Router } from 'express';
import { CreateQuestionValidator } from './CreateQuestionValidator';
import { CreateQuestionController } from './CreateQuestionController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class CreateQuestionMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateQuestionValidator();
        const { handle } = new CreateQuestionController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { CreateQuestionMiddleware };

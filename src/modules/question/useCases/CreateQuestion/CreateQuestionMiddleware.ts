import { Router } from 'express';

import { CreateQuestionValidator } from './CreateQuestionValidator';
import { CreateQuestionController } from './CreateQuestionController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class CreateQuestionMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateQuestionValidator();
        const { handle } = new CreateQuestionController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { CreateQuestionMiddleware };

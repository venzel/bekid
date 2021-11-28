import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { DeleteQuestionValidator } from './DeleteQuestionValidator';
import { DeleteQuestionController } from './DeleteQuestionController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class DeleteQuestionMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new DeleteQuestionValidator();
        const { handle } = new DeleteQuestionController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { DeleteQuestionMiddleware };

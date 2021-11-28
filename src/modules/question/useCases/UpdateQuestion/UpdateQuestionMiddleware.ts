import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { UpdateQuestionValidator } from './UpdateQuestionValidator';
import { UpdateQuestionController } from './UpdateQuestionController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class UpdateQuestionMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new UpdateQuestionValidator();
        const { handle } = new UpdateQuestionController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { UpdateQuestionMiddleware };

import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ShowQuestionValidator } from './ShowQuestionValidator';
import { ShowQuestionController } from './ShowQuestionController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class ShowQuestionMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new ShowQuestionValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ShowQuestionController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { ShowQuestionMiddleware };

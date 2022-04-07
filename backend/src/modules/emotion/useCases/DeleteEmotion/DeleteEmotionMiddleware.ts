import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { DeleteEmotionValidator } from './DeleteEmotionValidator';
import { DeleteEmotionController } from './DeleteEmotionController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class DeleteEmotionMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new DeleteEmotionValidator();
        const { handle } = new DeleteEmotionController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { DeleteEmotionMiddleware };

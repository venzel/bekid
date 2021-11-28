import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ShowEmotionValidator } from './ShowEmotionValidator';
import { ShowEmotionController } from './ShowEmotionController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class ShowEmotionMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new ShowEmotionValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ShowEmotionController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { ShowEmotionMiddleware };

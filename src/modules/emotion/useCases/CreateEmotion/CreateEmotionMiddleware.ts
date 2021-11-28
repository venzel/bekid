import { Router } from 'express';

import { CreateEmotionValidator } from './CreateEmotionValidator';
import { CreateEmotionController } from './CreateEmotionController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class CreateEmotionMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateEmotionValidator();
        const { handle } = new CreateEmotionController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { CreateEmotionMiddleware };

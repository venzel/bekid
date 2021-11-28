import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { UpdateEmotionValidator } from './UpdateEmotionValidator';
import { UpdateEmotionController } from './UpdateEmotionController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class UpdateEmotionMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new UpdateEmotionValidator();
        const { handle } = new UpdateEmotionController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { UpdateEmotionMiddleware };

import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ShowEmotionValidator } from './ShowEmotionValidator';
import { ShowEmotionController } from './ShowEmotionController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class ShowEmotionMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new ShowEmotionValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ShowEmotionController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { ShowEmotionMiddleware };

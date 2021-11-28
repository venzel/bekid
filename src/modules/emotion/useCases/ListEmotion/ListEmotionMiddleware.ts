import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ListEmotionController } from './ListEmotionController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class ListEmotionMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ListEmotionController();

        router[method](path, authenticate, role(['ADMIN']), handle);
    }
}

export { ListEmotionMiddleware };

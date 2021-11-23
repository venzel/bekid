import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ListEmotionsController } from './ListEmotionsController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class ListEmotionsMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ListEmotionsController();

        router[method](path, authenticate, role(['ADMIN']), handle);
    }
}

export { ListEmotionsMiddleware };

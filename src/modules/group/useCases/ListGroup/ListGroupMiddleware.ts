import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ListGroupController } from './ListGroupController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class ListGroupMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ListGroupController();

        router[method](path, authenticate, role(['ADMIN']), handle);
    }
}

export { ListGroupMiddleware };

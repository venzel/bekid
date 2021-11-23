import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { ListUsersValidator } from './ListUsersValidator';
import { ListUsersController } from './ListUsersController';

class ListUsersMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new ListUsersValidator();
        const { handle } = new ListUsersController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { ListUsersMiddleware };

import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { ToggleAllowUserValidator } from './ToggleAllowUserValidator';
import { ToggleAllowUserController } from './ToggleAllowUserController';

class ToggleAllowUserMiddleware {
    public register(router: Router, method: method, path: string) {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new ToggleAllowUserValidator();
        const { handle } = new ToggleAllowUserController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { ToggleAllowUserMiddleware };

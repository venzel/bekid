import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { DeleteGroupValidator } from './DeleteGroupValidator';
import { DeleteGroupController } from './DeleteGroupController';

class DeleteGroupMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new DeleteGroupValidator();
        const { handle } = new DeleteGroupController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { DeleteGroupMiddleware };

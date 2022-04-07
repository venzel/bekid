import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { DeleteVoteValidator } from './DeleteVoteValidator';
import { DeleteVoteController } from './DeleteVoteController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class DeleteVoteMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new DeleteVoteValidator();
        const { handle } = new DeleteVoteController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { DeleteVoteMiddleware };

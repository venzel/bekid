import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { FindAllUsersContainNameController } from './FindAllUsersContainNameController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { FindAllUsersContainNameValidator } from './FindAllUsersContainNameValidator';

class FindAllUsersContainNameMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new FindAllUsersContainNameValidator();
        const { handle } = new FindAllUsersContainNameController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { FindAllUsersContainNameMiddleware };

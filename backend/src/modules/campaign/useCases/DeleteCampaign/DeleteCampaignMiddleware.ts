import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { DeleteCampaignValidator } from './DeleteCampaignValidator';
import { DeleteCampaignController } from './DeleteCampaignController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class DeleteCampaignMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new DeleteCampaignValidator();
        const { handle } = new DeleteCampaignController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { DeleteCampaignMiddleware };

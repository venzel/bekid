import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ShowCampaignValidator } from './ShowCampaignValidator';
import { ShowCampaignController } from './ShowCampaignController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class ShowCampaignMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new ShowCampaignValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ShowCampaignController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { ShowCampaignMiddleware };

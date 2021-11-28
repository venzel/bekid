import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ShowCampaignValidator } from './ShowCampaignValidator';
import { ShowCampaignController } from './ShowCampaignController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class ShowCampaignMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new ShowCampaignValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ShowCampaignController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { ShowCampaignMiddleware };

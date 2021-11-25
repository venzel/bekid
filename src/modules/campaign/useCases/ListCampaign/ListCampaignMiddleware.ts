import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { ListCampaignController } from './ListCampaignController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class ListCampaignMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { handle } = new ListCampaignController();

        router[method](path, authenticate, role(['ADMIN']), handle);
    }
}

export { ListCampaignMiddleware };

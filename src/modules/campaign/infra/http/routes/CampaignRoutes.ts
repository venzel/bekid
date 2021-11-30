import { Router } from 'express';

import { ShowCampaignMiddleware } from '@modules/campaign/useCases/ShowCampaign/ShowCampaignMiddleware';
import { CreateCampaignMiddleware } from '@modules/campaign/useCases/CreateCampaign/CreateCampaignMiddleware';
import { UpdateCampaignMiddleware } from '@modules/campaign/useCases/UpdateCampaign/UpdateCampaignMiddleware';
import { DeleteCampaignMiddleware } from '@modules/campaign/useCases/DeleteCampaign/DeleteCampaignMiddleware';
import { ListCampaignMiddleware } from '@modules/campaign/useCases/ListCampaign/ListCampaignMiddleware';

class CampaignRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateCampaignMiddleware().register(router, 'post', 'MANAGER', '/campaigns');

        // Update
        new UpdateCampaignMiddleware().register(router, 'put', 'MANAGER', '/campaigns');

        // List
        new ListCampaignMiddleware().register(router, 'get', 'MANAGER', '/campaigns');

        // Show
        new ShowCampaignMiddleware().register(router, 'get', 'MANAGER', '/campaigns/:id');

        // Delete
        new DeleteCampaignMiddleware().register(router, 'delete', 'MANAGER', '/campaigns/:id');
    }
}

export { CampaignRoutes };

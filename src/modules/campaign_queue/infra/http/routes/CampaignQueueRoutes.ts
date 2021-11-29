import { Router } from 'express';

import { MonitoreCampaignQueueMiddleware } from '@modules/campaign_queue/useCases/MonitoreCampaignQueue/MonitoreCampaignQueueMiddleware';

class CampaignQueueRoutes {
    public registerAll(router: Router): void {
        // Monitore
        new MonitoreCampaignQueueMiddleware().register(router, 'get', 'USER', '/campaings_queues/:id');
    }
}

export { CampaignQueueRoutes };

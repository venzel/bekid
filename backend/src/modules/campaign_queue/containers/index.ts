import { container } from 'tsyringe';

import { ICampaignQueueRepository } from '@modules/campaign_queue/repositories/ICampaignQueueRepository';
import { CampaignQueuePostgresRepository } from '../infra/typeorm/postgres/repositories/CampaignQueuePostgresRepository';

container.registerSingleton<ICampaignQueueRepository>('CampaignQueueRepository', CampaignQueuePostgresRepository);

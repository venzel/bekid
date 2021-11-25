import { container } from 'tsyringe';

import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';
import { CampaignPostgresRepository } from '../infra/typeorm/postgres/repositories/CampaignPostgresRepository';

container.registerSingleton<ICampaignRepository>('CampaignRepository', CampaignPostgresRepository);

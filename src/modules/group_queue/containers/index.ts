import { container } from 'tsyringe';

import { IGroupQueueRepository } from '@modules/group_queue/repositories/IGroupQueueRepository';
import { GroupQueuePostgresRepository } from '../infra/typeorm/postgres/repositories/GroupQueuePostgresRepository';

container.registerSingleton<IGroupQueueRepository>('GroupQueueRepository', GroupQueuePostgresRepository);

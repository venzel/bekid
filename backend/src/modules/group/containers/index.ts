import { container } from 'tsyringe';

import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { GroupPostgresRepository } from '../infra/typeorm/postgres/repositories/GroupPostgresRepository';

container.registerSingleton<IGroupRepository>('GroupRepository', GroupPostgresRepository);

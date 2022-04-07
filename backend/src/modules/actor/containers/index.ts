import { container } from 'tsyringe';

import { IActorRepository } from '@modules/actor/repositories/IActorRepository';
import { ActorPostgresRepository } from '../infra/typeorm/postgres/repositories/ActorPostgresRepository';

container.registerSingleton<IActorRepository>('ActorRepository', ActorPostgresRepository);

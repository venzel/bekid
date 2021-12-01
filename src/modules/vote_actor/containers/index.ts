import { container } from 'tsyringe';

import { IVoteActorRepository } from '@modules/vote_actor/repositories/IVoteActorRepository';
import { VoteActorPostgresRepository } from '../infra/typeorm/postgres/repositories/VoteActorPostgresRepository';

container.registerSingleton<IVoteActorRepository>('VoteActorRepository', VoteActorPostgresRepository);

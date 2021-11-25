import { container } from 'tsyringe';

import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';
import { VotePostgresRepository } from '../infra/typeorm/postgres/repositories/VotePostgresRepository';

container.registerSingleton<IVoteRepository>('VoteRepository', VotePostgresRepository);

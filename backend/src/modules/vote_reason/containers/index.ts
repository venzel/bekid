import { container } from 'tsyringe';

import { IVoteReasonRepository } from '@modules/vote_reason/repositories/IVoteReasonRepository';
import { VoteReasonPostgresRepository } from '../infra/typeorm/postgres/repositories/VoteReasonPostgresRepository';

container.registerSingleton<IVoteReasonRepository>('VoteReasonRepository', VoteReasonPostgresRepository);

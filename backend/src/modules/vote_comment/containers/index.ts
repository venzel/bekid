import { container } from 'tsyringe';

import { IVoteCommentRepository } from '@modules/vote_comment/repositories/IVoteCommentRepository';
import { VoteCommentPostgresRepository } from '../infra/typeorm/postgres/repositories/VoteCommentPostgresRepository';

container.registerSingleton<IVoteCommentRepository>('VoteCommentRepository', VoteCommentPostgresRepository);

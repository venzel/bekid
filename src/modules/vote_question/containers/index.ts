import { container } from 'tsyringe';

import { IVoteQuestionRepository } from '@modules/vote_question/repositories/IVoteQuestionRepository';
import { VoteQuestionPostgresRepository } from '../infra/typeorm/postgres/repositories/VoteQuestionPostgresRepository';

container.registerSingleton<IVoteQuestionRepository>('VoteQuestionRepository', VoteQuestionPostgresRepository);

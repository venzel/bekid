import { container } from 'tsyringe';

import { IQuestionRepository } from '@modules/question/repositories/IQuestionRepository';
import { QuestionPostgresRepository } from '../infra/typeorm/postgres/repositories/QuestionPostgresRepository';

container.registerSingleton<IQuestionRepository>('QuestionRepository', QuestionPostgresRepository);

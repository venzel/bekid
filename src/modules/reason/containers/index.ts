import { container } from 'tsyringe';

import { IReasonRepository } from '@modules/reason/repositories/IReasonRepository';
import { ReasonPostgresRepository } from '../infra/typeorm/postgres/repositories/ReasonPostgresRepository';

container.registerSingleton<IReasonRepository>('ReasonRepository', ReasonPostgresRepository);

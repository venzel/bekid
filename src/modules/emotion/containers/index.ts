import { container } from 'tsyringe';

import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { PostgresEmotionRepository } from '../infra/typeorm/postgres/repositories/PostgresEmotionRepository';

container.registerSingleton<IEmotionRepository>('EmotionRepository', PostgresEmotionRepository);

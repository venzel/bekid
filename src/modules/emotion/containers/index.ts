import { container } from 'tsyringe';

import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { EmotionPostgresRepository } from '../infra/typeorm/postgres/repositories/EmotionPostgresRepository';

container.registerSingleton<IEmotionRepository>('EmotionRepository', EmotionPostgresRepository);

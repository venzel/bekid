import { container } from 'tsyringe';

import '@modules/user/providers';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UserPostgresRepository } from '@modules/user/infra/typeorm/postgres/repositories/UserPostgresRepository';

import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { UserTokenMongoRepository } from '@modules/user/infra/typeorm/mongodb/repositories/UserTokenMongoRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserPostgresRepository);

container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenMongoRepository);

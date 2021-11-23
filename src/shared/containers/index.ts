import { container } from 'tsyringe';

import '@shared/providers';
import '@modules/user/providers';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { PostgresUserRepository } from '@modules/user/infra/typeorm/postgres/repositories/PostgresUserRepository';

import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { MongoUserTokenRepository } from '@modules/user/infra/typeorm/mongodb/repositories/MongoUserTokenRepository';

// postgres
container.registerSingleton<IUserRepository>('UserRepository', PostgresUserRepository);

// mongo
container.registerSingleton<IUserTokenRepository>('UserTokenRepository', MongoUserTokenRepository);

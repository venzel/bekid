import 'reflect-metadata';
import 'dotenv/config';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '@modules/user/providers/TokenProvider/models/ITokenProvider';
import { RegisterUserService } from './RegisterUserService';
import { UserRepositoryInMemory } from '@modules/user/repositories/inMemory/UserRepositoryInMemory';
import { HashProviderInMemory } from '@modules/user/providers/HashProvider/inMemory/HashProviderInMemory';
import { TokenProviderInMemory } from '@modules/user/providers/TokenProvider/inMemory/TokenProviderInMemory';
import { AppException } from '@shared/exceptions/AppException';

let userRepository: IUserRepository;
let hashProvider: IHashProvider;
let tokenProvider: ITokenProvider;
let registerUserService: RegisterUserService;

describe('RegisterUserService', () => {
    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        hashProvider = new HashProviderInMemory();
        tokenProvider = new TokenProviderInMemory();
        registerUserService = new RegisterUserService(userRepository, hashProvider, tokenProvider);
    });

    // TESTE 1

    it('should be register a new user', async () => {
        const generateHash = jest.spyOn(hashProvider, 'gererateHash');

        const generateToken = jest.spyOn(tokenProvider, 'generateToken');

        const user = await registerUserService.execute({
            name: 'tiago',
            email: 'tiago@gmail.com',
            password: 'penadepato',
            role: 'ADMIN',
        });

        expect(generateHash).toHaveBeenCalledWith('penadepato');

        expect(generateToken).toHaveBeenCalledWith({
            user_id: user.id,
            role: user.role,
            activated: user.activated,
        });

        expect(user).toHaveProperty('id');

        expect(user).toHaveProperty('token');
    });

    // TESTE 2

    it('should be not register a new user', async () => {
        registerUserService = new RegisterUserService(userRepository, hashProvider, tokenProvider);

        await registerUserService.execute({
            name: 'tiago',
            email: 'tiago@gmail.com',
            password: 'penadepato',
            role: 'USER',
        });

        await expect(
            registerUserService.execute({
                name: 'tiago',
                email: 'tiago@gmail.com',
                password: 'penadepato',
                role: 'USER',
            })
        ).rejects.toBeInstanceOf(AppException);
    });
});

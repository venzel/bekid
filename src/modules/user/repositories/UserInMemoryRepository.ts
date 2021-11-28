import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UserInMemoryEntity } from '../models/entities/UserInMemoryEntity';

class UserInMemoryRepository implements IUserRepository {
    private _repository: IUserEntity[];

    constructor() {
        this._repository = [];
    }

    public async count(): Promise<number> {
        return this._repository.length;
    }

    public async findOneById(userId: string): Promise<IUserEntity | undefined> {
        return this._repository.find((user) => user.id === userId);
    }

    public async findAllByIds(userIds: string[]): Promise<IUserEntity[]> {
        return [];
    }

    public async findOneByName(userName: string): Promise<IUserEntity | undefined> {
        return this._repository.find((user) => user.name === userName);
    }

    public async findOneByEmail(userEmail: string): Promise<IUserEntity | undefined> {
        return this._repository.find((user) => user.email === userEmail);
    }

    public async create(user: ICreateUserDTO): Promise<IUserEntity> {
        const { name, email, password, role, activated } = user;

        const userInMemoryEntity: IUserEntity = new UserInMemoryEntity();

        const id: string = uuid();

        Object.assign(userInMemoryEntity, { id, name, email, password, role, activated });

        this._repository.push(userInMemoryEntity);

        return userInMemoryEntity;
    }

    public async save(user: IUserEntity): Promise<IUserEntity> {
        const userIndex: number = this._repository.indexOf(user);

        if (userIndex !== -1) {
            const currentDate = new Date();

            user.updated_at = currentDate;

            this._repository[userIndex] = user;
        }

        return user;
    }

    public async delete(user: IUserEntity): Promise<IUserEntity> {
        const userIndex: number = this._repository.indexOf(user);

        if (userIndex !== -1) {
            const currentDate = new Date();

            user.updated_at = currentDate;
            user.deleted_at = currentDate;

            this._repository[userIndex] = user;
        }

        return user;
    }

    public async list(): Promise<IUserEntity[]> {
        return this._repository;
    }
}

export { UserInMemoryRepository };

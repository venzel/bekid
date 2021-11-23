import { v4 as uuid } from 'uuid';
import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { FakeUserEntity } from '../../models/entities/fakes/FakeUserEntity';

class FakeUserRepository implements IUserRepository {
    private _repository: IUserEntity[];

    constructor() {
        this._repository = [];
    }

    public async count(): Promise<number> {
        return this._repository.length;
    }

    public async findOneById(user_id: string): Promise<IUserEntity | undefined> {
        return this._repository.find((user) => user.id === user_id);
    }

    public async findOneByName(user_name: string): Promise<IUserEntity | undefined> {
        return this._repository.find((user) => user.name === user_name);
    }

    public async findOneByEmail(user_email: string): Promise<IUserEntity | undefined> {
        return this._repository.find((user) => user.email === user_email);
    }

    public async create(user: ICreateUserDTO): Promise<IUserEntity> {
        const { name, email, password, role, activated } = user;

        const fakeUser: IUserEntity = new FakeUserEntity();

        const id: string = uuid();

        Object.assign(fakeUser, { id, name, email, password, role, activated });

        this._repository.push(fakeUser);

        return fakeUser;
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

export { FakeUserRepository };

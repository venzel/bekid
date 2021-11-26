import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UserPostgresEntity } from '../entities/UserPostgresEntity';

class UserPostgresRepository implements IUserRepository {
    private _repository: Repository<IUserEntity>;

    constructor() {
        this._repository = getRepository<IUserEntity>(UserPostgresEntity, 'default');
    }

    public async count(): Promise<number> {
        return this._repository.count({ where: { deleted_at: null } });
    }

    public async findAllByIds(userIds: string[]): Promise<IUserEntity[]> {
        return await this._repository.findByIds(userIds);
    }

    public async findOneById(userId: string): Promise<IUserEntity | undefined> {
        return await this._repository.findOne({ where: { id: userId, deleted_at: null } });
    }

    public async findOneByName(userName: string): Promise<IUserEntity | undefined> {
        return await this._repository.findOne({ where: { name: userName, deleted_at: null } });
    }

    public async findOneByEmail(userEmail: string): Promise<IUserEntity | undefined> {
        return await this._repository.findOne({ where: { email: userEmail, deleted_at: null } });
    }

    public async create(data: ICreateUserDTO): Promise<IUserEntity> {
        const { name, email, password, role, activated } = data;

        const avatar = '';

        const allowed = true;

        const createdUser = this._repository.create({ name, email, password, role, avatar, allowed, activated });

        await this._repository.save(createdUser);

        return createdUser;
    }

    public async save(user: IUserEntity): Promise<IUserEntity> {
        const currentDate = new Date();

        user.updated_at = currentDate;

        await this._repository.save(user);

        return user;
    }

    public async delete(user: IUserEntity): Promise<IUserEntity> {
        const currentDate = new Date();

        user.allowed = false;

        user.activated = false;

        user.deleted_at = currentDate;

        await this.save(user);

        return user;
    }

    public async list(): Promise<IUserEntity[]> {
        return await this._repository.find();
    }
}

export { UserPostgresRepository };

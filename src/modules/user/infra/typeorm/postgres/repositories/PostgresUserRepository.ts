import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '@modules/user/useCases/CreateUser/ICreateUserDTO';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { PostgresUserEntity } from '../entities/PostgresUserEntity';

class PostgresUserRepository implements IUserRepository {
    private _repository: Repository<IUserEntity>;

    constructor() {
        this._repository = getRepository<IUserEntity>(PostgresUserEntity, 'default');
    }

    public async count(): Promise<number> {
        return this._repository.count({ where: { deleted_at: null } });
    }

    public async findOneById(user_id: string): Promise<IUserEntity | undefined> {
        return await this._repository.findOne({ where: { id: user_id, deleted_at: null } });
    }

    public async findOneByName(user_name: string): Promise<IUserEntity | undefined> {
        return await this._repository.findOne({ where: { name: user_name, deleted_at: null } });
    }

    public async findOneByEmail(user_email: string): Promise<IUserEntity | undefined> {
        return await this._repository.findOne({ where: { email: user_email, deleted_at: null } });
    }

    public async create(data: ICreateUserDTO): Promise<IUserEntity> {
        const { user_id: id, name, email, password, role, activated } = data;

        const avatar = '';

        const allowed = true;

        const createdUser = this._repository.create({
            id,
            name,
            email,
            password,
            role,
            avatar,
            allowed,
            activated,
        });

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

export { PostgresUserRepository };

import { MongoRepository, getMongoRepository } from 'typeorm';
import { IUserTokenSchema } from '@modules/user/models/schemas/IUserTokenSchema';
import { MongoUserTokenSchema } from '../schemas/MongoUserTokenSchema';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { ICreateTokenDTO } from '@modules/user/dtos/ICreateTokenDTO';

class MongoUserTokenRepository implements IUserTokenRepository {
    private _repository: MongoRepository<IUserTokenSchema>;

    constructor() {
        this._repository = getMongoRepository(MongoUserTokenSchema, 'mongodb');
    }

    public async findOneByToken(token: string): Promise<IUserTokenSchema | undefined> {
        return await this._repository.findOne({ where: { token } });
    }

    public async create(data: ICreateTokenDTO): Promise<string> {
        const { token, user_id } = data;

        const createdUserToken = this._repository.create({ token, user_id });

        await this._repository.save(createdUserToken);

        return token;
    }

    public async deleteTokensByOwnerId(user_id: string): Promise<void> {
        await this._repository.delete({ user_id });
    }
}

export { MongoUserTokenRepository };

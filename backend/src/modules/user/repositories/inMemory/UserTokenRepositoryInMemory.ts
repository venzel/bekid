import { v4 as uuid } from 'uuid';

import { IUserTokenSchema } from '@modules/user/models/schemas/IUserTokenSchema';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { ICreateTokenDTO } from '@modules/user/dtos/ICreateTokenDTO';
import { UserTokenInMemorySchema } from '../../models/schemas/UserTokenInMemorySchema';

class UserTokenRepositoryInMemory implements IUserTokenRepository {
    private _repository: IUserTokenSchema[];

    constructor() {
        this._repository = [];
    }

    public async findOneByToken(token: string): Promise<IUserTokenSchema | undefined> {
        return this._repository.find((data) => data.token === token);
    }

    public async create(data: ICreateTokenDTO): Promise<string> {
        const { user_id } = data;

        const userTokenInMemorySchema = new UserTokenInMemorySchema();

        const token: string = uuid();

        const id: string = uuid();

        Object.assign(userTokenInMemorySchema, { id, token, user_id });

        this._repository.push(userTokenInMemorySchema);

        return token;
    }

    public async deleteTokensByOwnerId(user_id: string): Promise<void> {
        this._repository = this._repository.filter((data) => data.user_id !== user_id);
    }
}

export { UserTokenRepositoryInMemory };

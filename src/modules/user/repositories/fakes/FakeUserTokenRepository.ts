import { v4 as uuid } from 'uuid';
import { IUserTokenSchema } from '@modules/user/models/schemas/IUserTokenSchema';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { ICreateTokenDTO } from '@modules/user/dtos/ICreateTokenDTO';
import { FakeUserTokenSchema } from '../../models/schemas/fakes/FakeUserToken';

class FakeUserTokenRepository implements IUserTokenRepository {
    private _repository: IUserTokenSchema[];

    constructor() {
        this._repository = [];
    }

    public async findOneByToken(token: string): Promise<IUserTokenSchema | undefined> {
        return this._repository.find((data) => data.token === token);
    }

    public async create(data: ICreateTokenDTO): Promise<string> {
        const { owner_id } = data;

        const fakeUserToken = new FakeUserTokenSchema();

        const token: string = uuid();

        const id: string = uuid();

        Object.assign(fakeUserToken, { id, token, owner_id });

        this._repository.push(fakeUserToken);

        return token;
    }

    public async deleteTokensByOwnerId(owner_id: string): Promise<void> {
        this._repository = this._repository.filter((data) => data.owner_id !== owner_id);
    }
}

export { FakeUserTokenRepository };

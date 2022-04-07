import { IUserTokenSchema } from '../models/schemas/IUserTokenSchema';
import { ICreateTokenDTO } from '../dtos/ICreateTokenDTO';

interface IUserTokenRepository {
    findOneByToken(token: string): Promise<IUserTokenSchema | undefined>;

    create(data: ICreateTokenDTO): Promise<string>;

    deleteTokensByOwnerId(userId: string): Promise<void>;
}

export { IUserTokenRepository };

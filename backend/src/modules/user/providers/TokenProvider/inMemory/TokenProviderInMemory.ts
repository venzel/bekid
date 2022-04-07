import { randomBytes } from 'crypto';

import { ICreatePayloadDTO } from '@modules/user/dtos/ICreatePayloadDTO';
import { IPayloadDTO } from '@modules/user/dtos/IPayloadDTO';
import { ITokenProvider } from '../models/ITokenProvider';

class TokenProviderInMemory implements ITokenProvider {
    public async generateToken(data: ICreatePayloadDTO): Promise<string> {
        const token: string = randomBytes(8).toString('hex');

        return token;
    }

    public validateToken(_: string): IPayloadDTO {
        const userId: string = randomBytes(2).toString('hex');

        return {
            user: {
                user_token_id: userId,
                user_token_role: 'USER',
                user_token_activated: true,
            },
        };
    }
}

export { TokenProviderInMemory };

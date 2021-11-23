import { ICreatePayloadDTO } from '@modules/user/dtos/ICreatePayloadDTO';
import { IPayloadDTO } from '@modules/user/dtos/IPayloadDTO';
import { randomBytes } from 'crypto';
import { ITokenProvider } from '../models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
    public async generateToken(data: ICreatePayloadDTO): Promise<string> {
        const token: string = randomBytes(8).toString('hex');

        return token;
    }

    public validateToken(payload: string): IPayloadDTO {
        const userId: string = randomBytes(2).toString('hex');

        return {
            user: {
                user_id: userId,
                role: 'USER',
                activated: true,
            },
        };
    }
}

export { FakeTokenProvider };

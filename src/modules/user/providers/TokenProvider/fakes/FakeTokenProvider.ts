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
        const owner_id: string = randomBytes(2).toString('hex');

        return {
            user: {
                owner_id,
                role: 'USER',
                activated: true,
            },
        };
    }
}

export { FakeTokenProvider };

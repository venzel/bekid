import { sign, verify } from 'jsonwebtoken';

import { token_secret, token_expires } from '@configs/token';
import { ICreatePayloadDTO } from '@modules/user/dtos/ICreatePayloadDTO';
import { IPayloadDTO } from '@modules/user/dtos/IPayloadDTO';
import { ITokenProvider } from '../models/ITokenProvider';
import { AppException } from '@shared/exceptions/AppException';

class JWTTokenProvider implements ITokenProvider {
    public async generateToken(data: ICreatePayloadDTO): Promise<string> {
        const { user_id, role, activated } = data;

        try {
            const payload: IPayloadDTO = {
                user: {
                    user_id,
                    role,
                    activated,
                },
            };

            const token: string = sign(payload, token_secret, { expiresIn: token_expires });

            return token;
        } catch {
            throw new Error('Token not generated!');
        }
    }

    public validateToken(token: string): IPayloadDTO {
        try {
            const decoded: object | string = verify(token, token_secret);

            const { user } = decoded as IPayloadDTO;

            return { user };
        } catch {
            throw new AppException('Token expired or invalid!', 403);
        }
    }
}

export { JWTTokenProvider };

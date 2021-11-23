import { ICreatePayloadDTO } from '@modules/user/dtos/ICreatePayloadDTO';
import { IPayloadDTO } from '@modules/user/dtos/IPayloadDTO';

interface ITokenProvider {
    generateToken(data: ICreatePayloadDTO): Promise<string>;

    validateToken(token: string): IPayloadDTO;
}

export { ITokenProvider };

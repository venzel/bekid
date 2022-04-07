import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

interface ICreatePayloadDTO {
    user_id: string;
    role: IRoleDTO;
    activated: boolean;
}

export { ICreatePayloadDTO };

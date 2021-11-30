import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

interface IRegisterUserDTO {
    name: string;
    email: string;
    password: string;
    role: IRoleDTO;
    avatar?: string;
    activated?: boolean;
    allowed?: boolean;
}

export { IRegisterUserDTO };

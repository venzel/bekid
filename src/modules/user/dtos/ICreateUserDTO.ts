import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: IRoleDTO;
    avatar?: string;
    activated?: boolean;
    allowed?: boolean;
}

export { ICreateUserDTO };

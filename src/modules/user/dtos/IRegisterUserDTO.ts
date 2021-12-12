type IRoleDTO = 'ALL' | 'ADMIN' | 'USER' | 'MANAGER';

interface IRegisterUserDTO {
    name: string;
    email: string;
    password: string;
    role: IRoleDTO;
    avatar?: string;
    slug?: string;
    activated?: boolean;
    allowed?: boolean;
}

export { IRoleDTO, IRegisterUserDTO };

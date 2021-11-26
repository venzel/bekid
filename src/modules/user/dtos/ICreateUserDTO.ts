interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    activated?: boolean;
    role?: string;
    allowed?: boolean;
}

export { ICreateUserDTO };

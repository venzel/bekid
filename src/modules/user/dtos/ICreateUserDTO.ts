interface ICreateUserDTO {
    user_id?: string;
    name: string;
    email: string;
    password: string;
    activated?: boolean;
    role?: string;
    allowed?: boolean;
}

export { ICreateUserDTO };

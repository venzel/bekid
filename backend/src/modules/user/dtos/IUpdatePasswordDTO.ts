interface IUpdatePasswordDTO {
    user_token_id: string;
    current_password: string;
    new_password: string;
}

export { IUpdatePasswordDTO };

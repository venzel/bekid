interface IUpdatePasswordDTO {
    current_password: string;
    new_password: string;
    user_id: string;
}

export { IUpdatePasswordDTO };

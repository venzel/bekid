interface IUpdatePasswordDTO {
    current_password: string;
    new_password: string;
    owner_id: string;
}

export { IUpdatePasswordDTO };

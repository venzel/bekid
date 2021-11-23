import { ICreateUserDTO } from '../useCases/CreateUser/ICreateUserDTO';
import { IUserEntity } from '../models/entities/IUserEntity';

interface IUserRepository {
    count(): Promise<number>;

    findOneById(user_id: string): Promise<IUserEntity | undefined>;

    findOneByName(user_name: string): Promise<IUserEntity | undefined>;

    findOneByEmail(user_email: string): Promise<IUserEntity | undefined>;

    create(data: ICreateUserDTO): Promise<IUserEntity>;

    save(user: IUserEntity): Promise<IUserEntity>;

    delete(user: IUserEntity): Promise<IUserEntity>;

    list(): Promise<IUserEntity[]>;
}

export { IUserRepository };

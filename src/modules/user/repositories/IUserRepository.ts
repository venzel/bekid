import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUserEntity } from '../models/entities/IUserEntity';

interface IUserRepository {
    count(): Promise<number>;

    findOneById(userId: string): Promise<IUserEntity | undefined>;

    findAllByIds(userIds: string[]): Promise<IUserEntity[]>;

    findOneByName(userName: string): Promise<IUserEntity | undefined>;

    findOneByEmail(userEmail: string): Promise<IUserEntity | undefined>;

    create(data: ICreateUserDTO): Promise<IUserEntity>;

    save(user: IUserEntity): Promise<IUserEntity>;

    delete(user: IUserEntity): Promise<IUserEntity>;

    list(): Promise<IUserEntity[]>;
}

export { IUserRepository };

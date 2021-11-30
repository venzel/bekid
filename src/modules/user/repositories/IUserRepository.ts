import { IRegisterUserDTO } from '../dtos/IRegisterUserDTO';
import { IUserEntity } from '../models/entities/IUserEntity';

interface IUserRepository {
    count(): Promise<number>;

    findOneById(userId: string): Promise<IUserEntity | undefined>;

    findAllByIds(usersIds: string[]): Promise<IUserEntity[]>;

    findOneByName(userName: string): Promise<IUserEntity | undefined>;

    findAllContainsName(userPartName: string): Promise<IUserEntity[]>;

    findOneByEmail(userEmail: string): Promise<IUserEntity | undefined>;

    create(data: IRegisterUserDTO): Promise<IUserEntity>;

    save(user: IUserEntity): Promise<IUserEntity>;

    delete(user: IUserEntity): Promise<IUserEntity>;

    list(): Promise<IUserEntity[]>;
}

export { IUserRepository };

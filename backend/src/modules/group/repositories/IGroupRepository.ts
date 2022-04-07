import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { ICreateGroupDTO } from '@modules/group/dtos/ICreateGroupDTO';

interface IGroupRepository {
    findOneById(groupId: string): Promise<IGroupEntity | undefined>;

    findOneByName(name: string): Promise<IGroupEntity | undefined>;

    findOneByUserIdAndGroupName(userId: string, groupName: string): Promise<IGroupEntity | undefined>;

    listAllByUserId(managerId: string): Promise<IGroupEntity[]>;

    create(data: ICreateGroupDTO): Promise<IGroupEntity>;

    save(group: IGroupEntity): Promise<IGroupEntity>;

    delete(group: IGroupEntity): Promise<IGroupEntity>;

    list(): Promise<IGroupEntity[]>;
}

export { IGroupRepository };

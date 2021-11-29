import { v4 as uuid } from 'uuid';

import { ICreateGroupDTO } from '@modules/group/dtos/ICreateGroupDTO';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { GroupInMemoryEntity } from '../models/entities/GroupInMemoryEntity';

class GroupInMemoryRepository implements IGroupRepository {
    private _repository: IGroupEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneById(groupId: string): Promise<IGroupEntity | undefined> {
        return this._repository.find((data) => data.id === groupId);
    }

    public async findOneByName(name: string): Promise<IGroupEntity | undefined> {
        return this._repository.find((data) => data.name === name);
    }

    public async findOneByUserIdAndGroupName(userId: string, groupName: string): Promise<IGroupEntity | undefined> {
        return this._repository.find((data) => data.user_id === userId && data.name === groupName);
    }

    public async listAllByManagerId(managerId: string): Promise<IGroupEntity[]> {
        return this._repository.filter((e) => e.user_id === managerId);
    }

    public async create(data: ICreateGroupDTO): Promise<IGroupEntity> {
        const { user_id, name } = data;

        const groupInMemoryEntity = new GroupInMemoryEntity();

        const id = uuid();

        Object.assign(groupInMemoryEntity, { id, user_id, name });

        this._repository.push(groupInMemoryEntity);

        return groupInMemoryEntity;
    }

    public async save(group: IGroupEntity): Promise<IGroupEntity> {
        const groupIndex: number = this._repository.indexOf(group);

        if (groupIndex !== -1) {
            this._repository[groupIndex] = group;
        }

        return group;
    }

    public async delete(group: IGroupEntity): Promise<IGroupEntity> {
        const groupIndex: number = this._repository.indexOf(group);

        if (groupIndex !== -1) {
            this._repository.splice(groupIndex, 1);
        }

        return group;
    }

    public async list(): Promise<IGroupEntity[]> {
        return this._repository;
    }
}

export { GroupInMemoryRepository };

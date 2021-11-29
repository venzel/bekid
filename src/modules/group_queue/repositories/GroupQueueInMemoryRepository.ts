import { v4 as uuid } from 'uuid';

import { ICreateGroupQueueDTO } from '@modules/group_queue/dtos/ICreateGroupQueueDTO';
import { IGroupQueueEntity } from '@modules/group_queue/models/entities/IGroupQueueEntity';
import { GroupQueueInMemoryEntity } from '../models/entities/GroupQueueInMemoryEntity';
import { IGroupQueueRepository } from '@modules/group_queue/repositories/IGroupQueueRepository';

class GroupQueueInMemoryRepository implements IGroupQueueRepository {
    private _repository: IGroupQueueEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneByGroupIdAndUserId(groupId: string, userId: string): Promise<IGroupQueueEntity | undefined> {
        return this._repository.find((data) => data.group_id === groupId && data.user_id === userId);
    }

    public async findAllByUserId(userId: string): Promise<IGroupQueueEntity[]> {
        return this._repository.filter((e) => e.user_id === userId);
    }

    public async create(data: ICreateGroupQueueDTO): Promise<IGroupQueueEntity> {
        const { group_id, user_id } = data;

        const groupQueueInMemoryEntity = new GroupQueueInMemoryEntity();

        const id = uuid();

        Object.assign(groupQueueInMemoryEntity, { id, group_id, user_id });

        this._repository.push(groupQueueInMemoryEntity);

        return groupQueueInMemoryEntity;
    }

    public async save(groupQueue: IGroupQueueEntity): Promise<IGroupQueueEntity> {
        const groupQueueIndex: number = this._repository.indexOf(groupQueue);

        if (groupQueueIndex !== -1) {
            this._repository[groupQueueIndex] = groupQueue;
        }

        return groupQueue;
    }

    public async delete(groupQueue: IGroupQueueEntity): Promise<IGroupQueueEntity> {
        const groupQueueIndex: number = this._repository.indexOf(groupQueue);

        if (groupQueueIndex !== -1) {
            this._repository.splice(groupQueueIndex, 1);
        }

        return groupQueue;
    }

    public async list(): Promise<IGroupQueueEntity[]> {
        return this._repository;
    }
}

export { GroupQueueInMemoryRepository };

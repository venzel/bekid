import { getRepository, Repository } from 'typeorm';

import { IGroupQueueEntity } from '@modules/group_queue/models/entities/IGroupQueueEntity';
import { GroupQueuePostgresEntity } from '../entities/GroupQueuePostgresEntity';
import { IGroupQueueRepository } from '@modules/group_queue/repositories/IGroupQueueRepository';
import { ICreateGroupQueueDTO } from '@modules/group_queue/dtos/ICreateGroupQueueDTO';

class GroupQueuePostgresRepository implements IGroupQueueRepository {
    private _repository: Repository<IGroupQueueEntity>;

    constructor() {
        this._repository = getRepository(GroupQueuePostgresEntity, 'default');
    }

    public async findOneByGroupIdAndUserId(groupId: string, userId: string): Promise<IGroupQueueEntity | undefined> {
        return await this._repository.findOne({ where: { group_id: groupId, user_id: userId } });
    }

    public async findAllByUserId(userId: string): Promise<IGroupQueueEntity[]> {
        return await this._repository.find({ where: { user_id: userId } });
    }

    public async create(data: ICreateGroupQueueDTO): Promise<IGroupQueueEntity> {
        const { group_id, user_id } = data;

        const groupQueueCreated = this._repository.create({ group_id, user_id });

        await this._repository.save(groupQueueCreated);

        return groupQueueCreated;
    }

    public async save(groupQueue: IGroupQueueEntity): Promise<IGroupQueueEntity> {
        await this._repository.save(groupQueue);

        return groupQueue;
    }

    public async delete(groupQueue: IGroupQueueEntity): Promise<IGroupQueueEntity> {
        await this._repository.remove(groupQueue);

        return groupQueue;
    }

    public async list(): Promise<IGroupQueueEntity[]> {
        return await this._repository.find();
    }
}

export { GroupQueuePostgresRepository };

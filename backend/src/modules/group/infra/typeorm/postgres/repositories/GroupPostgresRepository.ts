import { getRepository, Repository } from 'typeorm';

import { ICreateGroupDTO } from '@modules/group/dtos/ICreateGroupDTO';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { GroupPostgresEntity } from '../entities/GroupPostgresEntity';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';

class GroupPostgresRepository implements IGroupRepository {
    private _repository: Repository<IGroupEntity>;

    constructor() {
        this._repository = getRepository(GroupPostgresEntity, 'default');
    }

    public async findOneById(groupId: string): Promise<IGroupEntity | undefined> {
        return await this._repository.findOne({ where: { id: groupId }, relations: ['users'] });
    }

    public async findOneByUserIdAndGroupName(userId: string, groupName: string): Promise<IGroupEntity | undefined> {
        return await this._repository.findOne({ where: { user_id: userId, name: groupName } });
    }

    public async listAllByUserId(managerId: string): Promise<IGroupEntity[]> {
        return await this._repository.find({ where: { user_id: managerId }, relations: ['users'] });
    }

    public async findOneByName(name: string): Promise<IGroupEntity | undefined> {
        return await this._repository.findOne({ where: { name } });
    }

    public async create(data: ICreateGroupDTO): Promise<IGroupEntity> {
        const { user_token_id, name } = data;

        const groupCreated = this._repository.create({ user_id: user_token_id, name });

        await this._repository.save(groupCreated);

        return groupCreated;
    }

    public async save(group: IGroupEntity): Promise<IGroupEntity> {
        await this._repository.save(group);

        return group;
    }

    public async delete(group: IGroupEntity): Promise<IGroupEntity> {
        await this._repository.remove(group);

        return group;
    }

    public async list(): Promise<IGroupEntity[]> {
        return await this._repository.find({
            relations: ['users'],
        });
    }
}

export { GroupPostgresRepository };

import { injectable, inject } from 'tsyringe';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';

@injectable()
class ListGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(): Promise<IGroupEntity[]> {
        return await this._groupRepository.list();
    }
}

export { ListGroupService };

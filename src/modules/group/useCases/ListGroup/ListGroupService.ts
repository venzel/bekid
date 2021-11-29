import { injectable, inject } from 'tsyringe';

import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';

@injectable()
class ListGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(managerId: string, role: string): Promise<IGroupEntity[]> {
        if (role === 'ADMIN') {
            return await this._groupRepository.list();
        }

        return await this._groupRepository.listAllByManagerId(managerId);
    }
}

export { ListGroupService };

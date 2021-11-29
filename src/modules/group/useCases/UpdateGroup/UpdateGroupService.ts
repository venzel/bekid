import { injectable, inject } from 'tsyringe';

import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IUpdateGroupDTO } from '@modules/group/dtos/IUpdateGroupDTO';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(groupId: string, managerId: string, role: string, data: IUpdateGroupDTO): Promise<IGroupEntity> {
        const { name } = data;

        /* Find group by id */

        const existsGroup = await this._groupRepository.findOneById(groupId);

        /* Exception estrategy guard */

        if (!existsGroup) {
            throw new AppException(`Group id ${groupId} not found!`, 404);
        }

        /* The group manager arrives */

        if (role !== 'ADMIN' && existsGroup.user_id !== managerId) {
            throw new AppException('It is not possible to update a group of another user!', 401);
        }

        /* Data update */

        existsGroup.name = name;

        /* Data saved in repository */

        const groupUpdated = await this._groupRepository.save(existsGroup);

        /* Returns the group updated */

        return groupUpdated;
    }
}

export { UpdateGroupService };

import { injectable, inject } from 'tsyringe';

import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IUpdateGroupDTO } from '@modules/group/dtos/IUpdateGroupDTO';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(groupId: string, data: IUpdateGroupDTO): Promise<IGroupEntity> {
        const { name } = data;

        /* Find group by id */

        const existsGroupWithId = await this._groupRepository.findOneById(groupId);

        /* Exception estrategy guard */

        if (!existsGroupWithId) {
            throw new AppException(`Group id ${groupId} not found!`, 404);
        }

        /* Data update */

        existsGroupWithId.name = name;

        /* Data saved in repository */

        const updatedGroup = await this._groupRepository.save(existsGroupWithId);

        /* Returns the group found */

        return updatedGroup;
    }
}

export { UpdateGroupService };

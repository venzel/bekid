import { injectable, inject } from 'tsyringe';

import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IUpdateGroupDTO } from '@modules/group/dtos/IUpdateGroupDTO';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(data: IUpdateGroupDTO): Promise<IGroupEntity> {
        /* Destructuring object */

        const { user_token_id, user_token_role, group_id, name } = data;

        /* Find group by id */

        const existsGroup = await this._groupRepository.findOneById(group_id);

        /* Strategy guard */

        if (!existsGroup) {
            throw new AppException(`Group with id ${group_id} not found!`, 404);
        }

        /* Check authority */

        if (user_token_role !== 'ADMIN' && existsGroup.user_id !== user_token_id) {
            throw new AppException('It is not possible to update a group of another user!', 401);
        }

        /* Data update */

        existsGroup.name = name;

        /* Data saved in repository */

        const groupUpdated = await this._groupRepository.save(existsGroup);

        /* Returns group updated */

        return groupUpdated;
    }
}

export { UpdateGroupService };

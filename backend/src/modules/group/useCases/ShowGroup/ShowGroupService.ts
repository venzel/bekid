import { injectable, inject } from 'tsyringe';

import { IGroupDTO } from '@modules/group/dtos/IGroupDTO';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ShowGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(data: IGroupDTO): Promise<IGroupEntity> {
        /* Destructuring object */

        const { user_token_id, user_token_role, group_id } = data;

        /* Find group by id */

        const existsGroup = await this._groupRepository.findOneById(group_id);

        /* Strategy guard */

        if (!existsGroup) {
            throw new AppException(`Group id ${group_id} not exists!`, 404);
        }

        /* Check authority */

        if (user_token_role !== 'ADMIN' && existsGroup.user_id !== user_token_id) {
            throw new AppException('It is not possible to view a group of another user!', 401);
        }

        /* Return group */

        return existsGroup;
    }
}

export { ShowGroupService };

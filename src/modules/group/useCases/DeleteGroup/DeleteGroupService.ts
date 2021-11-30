import { injectable, inject } from 'tsyringe';

import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { AppException } from '@shared/exceptions/AppException';
import { IGroupDTO } from '@modules/group/dtos/IGroupDTO';

@injectable()
class DeleteGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(data: IGroupDTO): Promise<IGroupEntity> {
        /* Destructuring object */

        const { user_token_id, user_token_role, group_id } = data;

        /* Find by group id */

        const existsGroup = await this._groupRepository.findOneById(group_id);

        /* Strategy guard */

        if (!existsGroup) {
            throw new AppException(`Group id ${group_id} not exists!`, 404);
        }

        /* The group manager arrives */

        if (user_token_role !== 'ADMIN' && existsGroup.user_id !== user_token_id) {
            throw new AppException('It is not possible to delete a group of another user!', 401);
        }

        /* Data delete in repository */

        await this._groupRepository.delete(existsGroup);

        /* Set group id in object */

        existsGroup.id = group_id;

        /* Returns group found */

        return existsGroup;
    }
}

export { DeleteGroupService };

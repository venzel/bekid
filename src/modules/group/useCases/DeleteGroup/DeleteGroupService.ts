import { injectable, inject } from 'tsyringe';

import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(groupId: string, managerId: string, role: String): Promise<IGroupEntity> {
        /* Find by group id */

        const existsGroup = await this._groupRepository.findOneById(groupId);

        /* Strategy guard */

        if (!existsGroup) {
            throw new AppException(`Group id ${groupId} not exists!`, 404);
        }

        /* The group manager arrives */

        if (role !== 'ADMIN' && existsGroup.user_id !== managerId) {
            throw new AppException('It is not possible to delete a group of another user!', 401);
        }

        /* Data delete (update) in repository */

        await this._groupRepository.delete(existsGroup);

        /* Set group id in object */

        existsGroup.id = groupId;

        /* Returns the group found */

        return existsGroup;
    }
}

export { DeleteGroupService };

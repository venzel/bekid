import { injectable, inject } from 'tsyringe';

import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ShowGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(groupId: string, managerId: string, role: string): Promise<IGroupEntity> {
        /* Find group by id */

        const existsGroup = await this._groupRepository.findOneById(groupId);

        /* Exception estrategy guard */

        if (!existsGroup) {
            throw new AppException(`Group id ${groupId} not exists!`, 404);
        }

        /* The group manager arrives */

        if (role !== 'ADMIN' && existsGroup.user_id !== managerId) {
            throw new AppException('It is not possible to view a group of another user!', 401);
        }

        /* Return group */

        return existsGroup;
    }
}

export { ShowGroupService };

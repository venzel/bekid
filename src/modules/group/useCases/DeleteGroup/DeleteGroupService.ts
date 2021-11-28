import { injectable, inject } from 'tsyringe';

import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(groupId: string): Promise<IGroupEntity> {
        /* Find by group id */

        const existsGroup = await this._groupRepository.findOneById(groupId);

        /* Exception estrategy guard */

        if (!existsGroup) {
            throw new AppException(`Group id ${groupId} not exists!`, 404);
        }

        /* Data delete (update) in repository */

        await this._groupRepository.delete(existsGroup);

        /* Returns the group found */

        return existsGroup;
    }
}

export { DeleteGroupService };

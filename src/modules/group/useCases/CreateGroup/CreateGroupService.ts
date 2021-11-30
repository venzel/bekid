import { injectable, inject } from 'tsyringe';

import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { ICreateGroupDTO } from '@modules/group/dtos/ICreateGroupDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(data: ICreateGroupDTO): Promise<IGroupEntity> {
        const { user_id, name } = data;

        /* Find by name group */

        const existsGroup = await this._groupRepository.findOneByUserIdAndGroupName(user_id, name);

        /* Strategy guard */

        if (existsGroup) {
            const { id, name } = existsGroup;

            const payload = { id, name };

            throw new AppException(`Group name already exists!`, 400, payload);
        }

        /* Group created */

        const groupCreated = await this._groupRepository.create({ user_id, name });

        /* Return group created */

        return groupCreated;
    }
}

export { CreateGroupService };

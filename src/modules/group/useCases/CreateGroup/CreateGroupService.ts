import { injectable, inject } from 'tsyringe';

import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { ICreateGroupDTO } from '@modules/group/dtos/ICreateGroupDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async handle(data: ICreateGroupDTO): Promise<IGroupEntity> {
        const { name } = data;

        /* Find by name group */

        const existsGroup = await this._groupRepository.findOneByName(name);

        /* Exception estrategy guard */

        if (existsGroup) {
            const { id, name } = existsGroup;

            const payload = { id, name };

            throw new AppException('Group name already exists', 400, payload);
        }

        /* Create group */

        const createdGroup = await this._groupRepository.create({ name });

        /* Return the group created */

        return createdGroup;
    }
}

export { CreateGroupService };

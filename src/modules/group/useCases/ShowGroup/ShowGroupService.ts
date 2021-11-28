import { injectable, inject } from 'tsyringe';

import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ShowGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(groupId: string): Promise<IGroupEntity> {
        const existsGroup = await this._groupRepository.findOneById(groupId);

        if (!existsGroup) {
            throw new AppException(`Group id ${groupId} not exists!`, 404);
        }

        return existsGroup;
    }
}

export { ShowGroupService };

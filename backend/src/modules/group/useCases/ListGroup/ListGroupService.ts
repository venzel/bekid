import { injectable, inject } from 'tsyringe';

import { IListGroupDTO } from '@modules/group/dtos/IListGroupDTO';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';

@injectable()
class ListGroupService {
    constructor(@inject('GroupRepository') private _groupRepository: IGroupRepository) {}

    public async execute(data: IListGroupDTO): Promise<IGroupEntity[]> {
        /* Destructuring object */

        const { user_token_id, user_token_role } = data;

        /* Check authority */

        if (user_token_role === 'ADMIN') {
            return await this._groupRepository.list();
        }

        /* Return */

        return await this._groupRepository.listAllByUserId(user_token_id);
    }
}

export { ListGroupService };

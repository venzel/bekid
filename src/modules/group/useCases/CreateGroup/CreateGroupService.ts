import { injectable, inject } from 'tsyringe';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IGenerateIdProvider } from '@shared/providers/generateIdProvider/model/IGenerateIdProvider';
import { ICreateGroupDTO } from '@modules/group/dtos/ICreateGroupDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateGroupService {
    constructor(
        @inject('GroupRepository') private _groupRepository: IGroupRepository,
        @inject('GenerateIdProvider') private _generateIdProvider: IGenerateIdProvider
    ) {}

    public async handle(data: ICreateGroupDTO): Promise<IGroupEntity> {
        const { name } = data;

        /* Generate group id provider */

        const generateGroupId = this._generateIdProvider.generateId();

        /* End generate group id provider */

        const createdGroup = await this._groupRepository.create({ group_id: generateGroupId, name });

        /* Return the group created */

        return createdGroup;
    }
}

export { CreateGroupService };

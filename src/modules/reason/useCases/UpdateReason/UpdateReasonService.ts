import { injectable, inject } from 'tsyringe';

import { IReasonRepository } from '@modules/reason/repositories/IReasonRepository';
import { IUpdateReasonDTO } from '../../dtos/IUpdateReasonDTO';
import { IReasonEntity } from '@modules/reason/models/entities/IReasonEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateReasonService {
    constructor(@inject('ReasonRepository') private _reasonRepository: IReasonRepository) {}

    public async execute(data: IUpdateReasonDTO): Promise<IReasonEntity> {
        /* Destructuring object */

        const { reason_id, description } = data;

        /* Find reason by id */

        const existsReason = await this._reasonRepository.findOneById(reason_id);

        /* Strategy guard */

        if (!existsReason) {
            throw new AppException(`Reason with id ${reason_id} not found!`, 404);
        }

        /* Data update */

        existsReason.description = description;

        /* Data saved in repository */

        const updatedReason = await this._reasonRepository.save(existsReason);

        /* Returns reason found */

        return updatedReason;
    }
}

export { UpdateReasonService };

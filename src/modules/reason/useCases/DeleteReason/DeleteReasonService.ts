import { injectable, inject } from 'tsyringe';

import { IReasonRepository } from '@modules/reason/repositories/IReasonRepository';
import { IReasonEntity } from '@modules/reason/models/entities/IReasonEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteReasonService {
    constructor(@inject('ReasonRepository') private _reasonRepository: IReasonRepository) {}

    public async execute(reasonId: string): Promise<IReasonEntity> {
        /* Find by reason id */

        const existsReason = await this._reasonRepository.findOneById(reasonId);

        /* Strategy guard */

        if (!existsReason) {
            throw new AppException(`Reason with id ${reasonId} not found`, 404);
        }

        /* Data delete in repository */

        await this._reasonRepository.delete(existsReason);

        /* Set group id in object */

        existsReason.id = reasonId;

        /* Returns reason found */

        return existsReason;
    }
}

export { DeleteReasonService };

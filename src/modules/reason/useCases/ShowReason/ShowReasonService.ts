import { injectable, inject } from 'tsyringe';

import { IReasonRepository } from '@modules/reason/repositories/IReasonRepository';
import { IReasonEntity } from '@modules/reason/models/entities/IReasonEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ShowReasonService {
    constructor(@inject('ReasonRepository') private _reasonRepository: IReasonRepository) {}

    public async execute(reasonId: string): Promise<IReasonEntity> {
        const existsReason = await this._reasonRepository.findOneById(reasonId);

        if (!existsReason) {
            throw new AppException(`Reason id ${reasonId} not found!`, 404);
        }

        return existsReason;
    }
}

export { ShowReasonService };

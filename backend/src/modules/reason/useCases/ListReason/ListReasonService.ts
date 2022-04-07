import { injectable, inject } from 'tsyringe';

import { IReasonEntity } from '@modules/reason/models/entities/IReasonEntity';
import { IReasonRepository } from '@modules/reason/repositories/IReasonRepository';

@injectable()
class ListReasonService {
    constructor(@inject('ReasonRepository') private _reasonRepository: IReasonRepository) {}

    public async execute(): Promise<IReasonEntity[]> {
        return await this._reasonRepository.list();
    }
}

export { ListReasonService };

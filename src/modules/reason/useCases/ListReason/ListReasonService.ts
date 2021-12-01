import { injectable, inject } from 'tsyringe';

import { IReasonEntity } from '@modules/reason/models/entities/IReasonEntity';
import { IReasonRepository } from '@modules/reason/repositories/IReasonRepository';

@injectable()
class ListReasonService {
    constructor(@inject('ReasonRepository') private _questionRepository: IReasonRepository) {}

    public async execute(): Promise<IReasonEntity[]> {
        return await this._questionRepository.list();
    }
}

export { ListReasonService };

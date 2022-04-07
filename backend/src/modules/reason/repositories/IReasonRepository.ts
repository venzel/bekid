import { IReasonEntity } from '@modules/reason/models/entities/IReasonEntity';
import { ICreateReasonDTO } from '@modules/reason/dtos/ICreateReasonDTO';

interface IReasonRepository {
    findOneById(reasonId: string): Promise<IReasonEntity | undefined>;

    create(data: ICreateReasonDTO): Promise<IReasonEntity>;

    save(reason: IReasonEntity): Promise<IReasonEntity>;

    delete(reason: IReasonEntity): Promise<IReasonEntity>;

    list(): Promise<IReasonEntity[]>;
}

export { IReasonRepository };

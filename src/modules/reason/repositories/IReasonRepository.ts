import { IReasonEntity } from '@modules/reason/models/entities/IReasonEntity';
import { ICreateReasonDTO } from '@modules/reason/dtos/ICreateReasonDTO';

interface IReasonRepository {
    findOneById(questionId: string): Promise<IReasonEntity | undefined>;

    create(data: ICreateReasonDTO): Promise<IReasonEntity>;

    save(question: IReasonEntity): Promise<IReasonEntity>;

    delete(question: IReasonEntity): Promise<IReasonEntity>;

    list(): Promise<IReasonEntity[]>;
}

export { IReasonRepository };

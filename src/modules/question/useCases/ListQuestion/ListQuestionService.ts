import { injectable, inject } from 'tsyringe';
import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { IQuestionRepository } from '@modules/question/repositories/IQuestionRepository';

@injectable()
class ListQuestionService {
    constructor(@inject('QuestionRepository') private _questionRepository: IQuestionRepository) {}

    public async execute(): Promise<IQuestionEntity[]> {
        return await this._questionRepository.list();
    }
}

export { ListQuestionService };

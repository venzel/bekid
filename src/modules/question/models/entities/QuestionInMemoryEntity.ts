import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';

class QuestionInMemoryEntity implements IQuestionEntity {
    id: string;
    description: string;
    created_at: Date;
}

export { QuestionInMemoryEntity };

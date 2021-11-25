import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ListGroupService } from './ListGroupService';
import { generateStatus } from '@shared/helpers/status';

class ListGroupController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListGroupService);

        const groups = await service.execute();

        const status = generateStatus(false, 201, 'Succesfully listed groups!');

        const docs = classToClass(groups);

        return res.status(201).json({ status, docs });
    }
}

export { ListGroupController };

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CreateGroupService } from './CreateGroupService';
import { generateStatus } from '@shared/helpers/status';

class CreateGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const service = container.resolve(CreateGroupService);

        const group = await service.handle({ name });

        const status = generateStatus(false, 201, 'Succesfully created group!');

        const doc = classToClass(group);

        return res.status(201).json({ status, doc });
    }
}

export { CreateGroupController };

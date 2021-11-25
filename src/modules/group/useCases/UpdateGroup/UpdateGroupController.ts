import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { UpdateGroupService } from './UpdateGroupService';
import { generateStatus } from '@shared/helpers/status';

class UpdateGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const groupId = req.params.id?.toString();

        const service = container.resolve(UpdateGroupService);

        const group = await service.execute(groupId, { name });

        const status = generateStatus(false, 201, 'Succesfully updated group!');

        const doc = classToClass(group);

        return res.status(200).json({ status, doc });
    }
}

export { UpdateGroupController };